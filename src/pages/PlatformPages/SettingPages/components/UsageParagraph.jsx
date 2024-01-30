import React, { useEffect } from "react";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import { Plus, Edit, Delete, Arrow, BackArrow, ForwardArrow } from "src/assets/svgs.jsx"
import KeywordsBarChart from "src/components/KeywordsBarChart/KeywordsBarChart.jsx";
import { connect } from 'react-redux';
import { fetchUsageData } from 'src/store/actions/usageData';
import ProgressBar from "src/components/ProgressBar/ProgressBar";

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

const dightToMonth = (digit) => {
    const monthMap = {
        1: "January",
        2: "February",
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
    }
    return monthMap[digit];
};

function Usage({ usageData, fetchUsageData, user }) {
    const [keyList, setKeyList] = React.useState([]);
    const { data: prevKey, error: prevError, loading: prevLoading } = useFetch(`api/get-keys`);
    const { loading: deleteLoading, error: deleteError, data: deleteStatus, postData: postDelete } = usePost(`api/delete-key/`);
    const { loading: newLoading, error: newKeyError, data: newKey, postData } = usePost(`api/create-api-key/`);
    const [currDate, setCurrDate] = React.useState(new Date());
    const customBundle = user?.custom_bundle;


    useEffect(() => {
        if (currDate)
            fetchUsageData(currDate.getMonth() + 1);
    }, [currDate]);

    useEffect(() => {
        if (prevKey) {
            setKeyList(prevKey);
        }
    }, [prevKey])

    useEffect(() => {
        if (newKey) {
            console.log(newKey);
            setKeyList([...keyList, newKey]);
        }
    }, [newKey]);

    const renderCustomBar = (planName) => {
        const plan = customBundle?.items?.planName;
    
        if (!plan) return null;
    
        const bars = [];
    
        if (plan?.input && plan?.assigned_input) {
            bars.push(
                <ProgressBar
                    key={`${planName}-input`}
                    name={`${planName} (Input)`}
                    current={plan.assigned_input - plan.input}
                    total={plan.assigned_input}
                    progressColor={"var(--primary)"}
                    remainColor={"var(--primary100)"}
                    progressLegend={"Usage"}
                    remainLegend={"Remaining"}
                />
            );
        }
    
        if (plan?.output && plan?.assigned_output) {
            bars.push(
                <ProgressBar
                    key={`Custom ${planName}-output`}
                    name={`Custom ${planName} (Output)`}
                    current={plan.assigned_output - plan.output}
                    total={plan.assigned_output}
                    progressColor={"var(--primary)"}
                    remainColor={"var(--primary100)"}
                    progressLegend={"Usage"}
                    remainLegend={"Remaining"}
                />
            );
        }
    
        if (plan?.mixed && plan?.assigned_mixed) {
            bars.push(
                <ProgressBar
                    key={`${planName}-mixed`}
                    name={`${planName} (Mixed)`}
                    current={plan.assigned_mixed - plan.mixed}
                    total={plan.assigned_mixed}
                    progressColor={"var(--primary)"}
                    remainColor={"var(--primary100)"}
                    progressLegend={"Usage"}
                    remainLegend={"Remaining"}
                />
            );
        }
    
        return bars;
    };
  


    return (


        <div
            className="flex-col items-start self-stretch"
        >

            <>
                <div className="flex-col items-center gap-lg self-stretch">
                    <div className="flex-row flex-start self-stretch">
                        <div className="flex-row items-center gap-xxs">
                            <div
                                className="flex-col"
                                onClick={() => {
                                    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1));
                                }}
                            >
                                <BackArrow />
                            </div>
                            <div className="display-xs">
                                {dightToMonth(currDate.getMonth() + 1)}
                            </div>
                            <div
                                className="flex-col"
                                onClick={() => {
                                    if (currDate.getMonth() === new Date().getMonth()) return;
                                    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1));
                                }}
                            >
                                <ForwardArrow fill={currDate.getMonth() === new Date().getMonth() ? "var(--gray3)" : "var(--black)"} />
                            </div>
                        </div>
                    </div>
                    {user?.organization?.owner?.active_subscription ?
                        <KeywordsBarChart data={usageData} dataKeyX={"name"} dataKeyY="usage" /> :
                        <KeywordsBarChart data={usageData} dataKeyX={"name"} dataKeyY="usage" fill="var(--success)" yLabel={"Free Trial Usage"} />
                    }
                    <div className="flex-col gap-md items-start">
                        <div className="display-xs">
                            Credits
                        </div>
                        <div className="text-md t-medium text-gray4">
                            Initial token credit assignment based on your plan. You will be charged usage-based only after using all your credits.
                        </div>
                        <ProgressBar
                            key={1}
                            name={"Free Trial"}
                            current={40000 - user.free_trial_remaining}
                            total={40000}
                            progressColor={"var(--purple-dark)"}
                            remainColor={"var(--purple-light)"}
                            progressLegend={"Usage"}
                            remainLegend={"Remaining"}
                        />
                        {renderCustomBar("flex_8k")}
                        {renderCustomBar("flex_32k")}
                    </div>
                </div>
            </>
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Usage);
