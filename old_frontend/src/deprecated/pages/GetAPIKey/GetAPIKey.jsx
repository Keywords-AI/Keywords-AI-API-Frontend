import React, { useEffect } from "react";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import {
  Plus,
  Edit,
  Delete,
  Arrow,
  BackArrow,
  ForwardArrow,
} from "src/assets/svgs.jsx";
import { CreateForm, DeleteForm, EditForm } from "./APIKeyForms.jsx";
import "./static/css/style.css";
import { cancelSubscription } from "src/services/stripe";
import KeywordsBarChart from "src/components/KeywordsBarChart/KeywordsBarChart.jsx";
import { connect } from "react-redux";
import { fetchUsageData } from "src/store/actions/usageData";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    usageData: state.usageData,
    user: state.user,
  };
};

const mapDispatchToProps = {
  // your actions here
  fetchUsageData,
};

const dightToMonth = (digit) => {
  const monthMap = {
    1: "January",
    2: "Febuary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return monthMap[digit];
};

function GetAPIKey({ usageData, fetchUsageData, user }) {
  const [keyList, setKeyList] = React.useState([]);
  const [displayNew, setDisplayNew] = React.useState("");
  const {
    data: prevKey,
    error: prevError,
    loading: prevLoading,
  } = useFetch(`api/get-keys`);
  const {
    loading: deleteLoading,
    error: deleteError,
    data: deleteStatus,
    postData: postDelete,
  } = usePost(`api/delete-key/`);
  const {
    loading: newLoading,
    error: newKeyError,
    data: newKey,
    postData,
  } = usePost(`api/create-api-key/`);
  const formRef = React.useRef(null);
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [showForm, setShowForm] = React.useState(false);
  const [deleteList, setDeleteList] = React.useState([]);
  const [whichForm, setWhichForm] = React.useState("create");
  const [editKey, setEditKey] = React.useState({});
  const getDateStr = (date, lastUsed = false) => {
    var dateFromAPI;
    if (!date && lastUsed) return "Never";
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
    };
    if (timeStamp === 0) {
      return "Never";
    } else {
      return dateFromAPI.toLocaleString("en-US", format);
    }
  };

  useEffect(() => {
    fetchUsageData(month);
  }, [month]);

  useEffect(() => {
    if (prevKey) {
      setKeyList(prevKey);
    }
  }, [prevKey]);

  useEffect(() => {
    if (newKey) {
      console.log(newKey);
      setKeyList([...keyList, newKey]);
    }
  }, [newKey]);

  return (
    <>
      <div className="api-key-container main-section-bottom bg-gray2">
        <>
          <div
            className="backdrop"
            style={{ display: showForm ? "" : "none" }}
            onClick={(e) => {
              if (!formRef?.current?.contains(e.target)) {
                setShowForm(false);
              }
            }}
          >
            {whichForm === "create" && (
              <CreateForm
                ref={formRef}
                newKey={newKey}
                newKeyError={newKeyError}
                postData={postData}
                setShowForm={setShowForm}
              />
            )}
            {whichForm === "edit" && (
              <EditForm
                ref={formRef}
                setKeyList={setKeyList}
                keyList={keyList}
                setShowForm={setShowForm}
                editKey={editKey}
              />
            )}
            {whichForm === "delete" && (
              <DeleteForm
                ref={formRef}
                setKeyList={setKeyList}
                keyList={keyList}
                deleteList={deleteList}
                postData={postDelete}
                setShowForm={setShowForm}
              />
            )}
          </div>
          <div className="flex-col cross-center g-lg stretch">
            <div className="flex-col cross-start g-sm stretch">
              <div className="display-sm">API Keys</div>
              <div className="text-lg">
                {"Your secret API keys are listed below. "}
                <a className="t-primary" href="/docs">
                  {"View API Documentation."}
                </a>
              </div>
            </div>
            <div className="flex-col cross-start g-sm stretch api-key-table">
              <div className="api-key-items flex-col fill">
                <div className="api-key-item table-header text-md">
                  <div className="col">Name</div>
                  <div className="col">Key</div>
                  <div className="col">Created</div>
                  <div className="col">Last Used</div>
                  <div className="col"></div>
                </div>
                {keyList &&
                  keyList.map((key, idx) => (
                    <div
                      className="api-key-item text-md"
                      key={idx}
                      style={{
                        color: "var(--black)",
                      }}
                    >
                      <div className="col">{key.name || "New Key"}</div>
                      <div className="col">
                        {(key.prefix
                          ? key.prefix
                          : newKey.api_key.slice(0, 8)) + "*".repeat(15)}
                      </div>
                      <div className="col">{getDateStr(key.created)}</div>
                      <div className="col">{getDateStr(key.last_used)}</div>
                      <div className="actions">
                        <div
                          onClick={() => {
                            setWhichForm("edit");
                            setEditKey(key);
                            setShowForm(!showForm);
                          }}
                        >
                          <Edit />
                        </div>
                        <div
                          onClick={() => {
                            console.log("delete");
                            setDeleteList([...deleteList, key.id]);
                            setWhichForm("delete");
                            setShowForm(!showForm);
                          }}
                        >
                          <Delete />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                style={{
                  alighSelf: "flex-start",
                }}
                onClick={() => {
                  setWhichForm("create");
                  setShowForm(!showForm);
                }}
                className="button-primary"
              >
                <Plus />
                {"Generate key"}
              </button>
            </div>
          </div>
          <div className="flex-col cross-center g-lg stretch">
            <div className="flex-col cross-start g-sm stretch">
              <div className="display-sm">Usage</div>
              <div className="text-lg">
                {
                  "Below you’ll find a summary of API Usage for your organization."
                }
              </div>
            </div>
            <div className="flex-row flex-start stretch">
              <div className="flex-row cross-center g-xxs">
                <div
                  className="flex-col"
                  onClick={() => {
                    setMonth(month - 1);
                  }}
                >
                  <BackArrow />
                </div>
                <div className="display-xs">{dightToMonth(month)}</div>
                <div
                  className="flex-col"
                  onClick={() => {
                    setMonth(month + 1);
                  }}
                >
                  <ForwardArrow />
                </div>
              </div>
            </div>
            <KeywordsBarChart
              data={usageData}
              dataKeyX={"name"}
              dataKeyY="usage"
            />
          </div>
          <div className="flex-col cross-start g-sm stretch t-l">
            <div className="display-sm">{"Support"}</div>
            <span className="text-lg t-gray4">
              {
                "You need help, have questions or want to give some feedback? Drop us a message at team@keywordsai.co or report a bug below. We will address your issue promptly."
              }
            </span>
            <button
              className="button-primary"
              onClick={() => {
                window.open(
                  "https://airtable.com/appVPjek12fgZXMaa/shrKnkYcon4XI14Px",
                  "_blank"
                );
              }}
            >
              {"Report a bug"}
              <Arrow />
            </button>
          </div>
          <div className="flex-col cross-start g-sm stretch">
            <div className="display-sm">{"Billing"}</div>
            <span className="text-lg t-gray4">
              {"Check you plan and billing details here."}
            </span>
            <div className="flex-row main-start cross-start g-xs stretch">
              <button className="button-primary">
                {"View pricing plans"}
                <Arrow />
              </button>
              <button
                className="button-secondary-gray"
                onClick={() => {
                  cancelSubscription();
                  window.location = "/";
                }}
              >
                {"Cancel plan"}
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAPIKey);
