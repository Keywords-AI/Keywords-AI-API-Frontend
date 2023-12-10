import React, { useEffect } from "react";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import { Plus, Edit, PureDelete } from "src/assets/svgs.jsx"
import { CreateForm, DeleteForm, EditForm } from "./components/APIKeyForms.jsx";
import { connect } from 'react-redux';
import { fetchUsageData } from 'src/store/actions/usageData';
import ListDisplay from "src/components/ListDisplay/ListDisplay.jsx";
import { retrieveContext } from "src/utilities/utilities.js";
import Popup from "src/components/Popup/Popup.jsx";

const mapStateToProps = (state) => {
    return {
        usageData: state.usageData,
        user: state.user,
    };
};

const mapDispatchToProps = {
    // your actions here
    fetchUsageData,
}


function GetAPIKey({ usageData, fetchUsageData, user }) {
    const [keyList, setKeyList] = React.useState([]);
    const [displaKeyList, setDisplayKeyList] = React.useState([]);
    const [displayNew, setDisplayNew] = React.useState("");
    const { data: prevKey, error: prevError, loading: prevLoading } = useFetch(`api/get-keys`);
    const { loading: deleteLoading, error: deleteError, data: deleteStatus, postData: postDelete } = usePost(`api/delete-key/`);
    const { loading: newLoading, error: newKeyError, data: newKey, postData } = usePost(`api/create-api-key/`);
    const formRef = React.useRef(null);
    const [month, setMonth] = React.useState(new Date().getMonth() + 1);
    const [showForm, setShowForm] = React.useState(false);
    const [deleteList, setDeleteList] = React.useState([]);
    const [whichForm, setWhichForm] = React.useState("create");
    const [editKey, setEditKey] = React.useState({});
    const getDateStr = (date, lastUsed = false) => {
        var dateFromAPI;
        if (!date && lastUsed) return "Never"
        else if (!date) {
            var dateFromAPI = new Date();
        } else {
            var dateFromAPI = new Date(date);
        }
        const timeStamp = dateFromAPI.getTime();
        const format = {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
        if (timeStamp === 0) {
            return "Never";
        } else {
            return dateFromAPI.toLocaleString("en-US", format);
        }
    }

    useEffect(() => {
        fetchUsageData(month);
    }, [month]);

    useEffect(() => {
        if (prevKey) {
            setKeyList(prevKey);
        }
    }, [prevKey])

    useEffect(() => {
        if (newKey) {
            setKeyList([...keyList, newKey]);
        }
    }, [newKey]);

    useEffect(() => {
        if (keyList?.length > 0) {
            
            setDisplayKeyList(
                keyList
                    .filter(key => !key.non_deletable)
                    .map(key => ({
                        ...key,
                        last_used: getDateStr(key.last_used),
                        created: getDateStr(key.created),
                        context: retrieveContext(key.plan_name)
                    }))
            );
        }
    }, [keyList]);

    const deleteListRef = React.useRef([]);
    useEffect(() => {
        if (deleteListRef.current) {
            deleteListRef.current = deleteList;
        }
    }, [deleteList]);

    const Actions = (key, idx) => {
        return (
            <div className="flex-row self-stretch gap-sm">
                <div
                    onClick={() => {
                        setWhichForm("edit");
                        setEditKey(key);
                        setShowForm(
                            prev => !prev
                        );
                    }}
                    className="hover-cp"
                >
                    <Edit />
                </div>
                <div
                    onClick={() => {
                        setDeleteList([...deleteListRef.current, key.id]);
                        setWhichForm("delete");
                        setShowForm(
                            prev => !prev
                        );
                    }}
                    className="hover-cp"
                >

                    <PureDelete />
                </div>
            </div>
        )

    }

    return (
        <div className="flex-col gap-lg items-start self-stretch">
            {
                user?.organization?.owner?.active_subscription ? <div
                    className="flex-col items-start self-stretch gap-lg"
                >
                    <>
                        <Popup
                            open={showForm}
                            closePopup={() => {
                                setShowForm(false);
                                setDeleteList([]);
                            }}
                        >

                            {whichForm === "create" && <CreateForm
                                ref={formRef}
                                user={user}
                                newKey={newKey}
                                newKeyError={newKeyError}
                                postData={postData}
                                setKeyList={setKeyList}
                                setShowForm={setShowForm}
                            />}
                            {
                                whichForm === "edit" && <EditForm
                                    ref={formRef}
                                    setKeyList={setKeyList}
                                    keyList={keyList}
                                    setShowForm={setShowForm}
                                    editKey={editKey}
                                />
                            }
                            {
                                whichForm === "delete" && <DeleteForm
                                    ref={formRef}
                                    setKeyList={setKeyList}
                                    keyList={keyList}
                                    deleteList={deleteList}
                                    postData={postDelete}
                                    setShowForm={setShowForm}
                                />
                            }
                        </Popup>

                        <div className="flex-col items-start gap-md self-stretch api-key-table">
                            <ListDisplay
                                headers={["Name", "Key", "Context", "Created", "Last Used"]}
                                rows={displaKeyList}
                                rowIterator={["name", "prefix", "context", "created", "last_used"]}
                                rowLayout="1fr repeat(4, 120px) 60px"
                                ActionsComponents={Actions}
                            />
                            <button
                                style={{
                                    alighSelf: "flex-start",
                                }}
                                onClick={() => {
                                    setWhichForm("create");
                                    setShowForm(!showForm)
                                }}
                                className="button-primary"
                            >
                                <Plus />
                                {"Generate key"}
                            </button>
                        </div>
                    </>
                </div>
                    :
                    <div className="flex-col items-start gap-lg self-stretch">
                        <div className="text-md t-error">
                            You do not have an active subscription. Please subscribe to get an API key.
                        </div>
                    </div>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAPIKey);