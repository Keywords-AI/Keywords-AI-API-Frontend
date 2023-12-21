import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { KeywordsBarChart } from 'src/components/Display'
import { Button } from 'src/components/Buttons'
import { Left, Right } from 'src/components/Icons'
import { getUsageData, getLastMonthUsageData, getNextMonthUsageData, setIsFirst, setIsLast } from 'src/store/actions'
import { digitToMonth } from 'src/utilities/objectProcessing'

const mapStateToProps = (state) => ({
    usage: state.usage,
})

const mapDispatchToProps = {
    getUsageData,
    getLastMonthUsageData,
    getNextMonthUsageData
}

export const UsageChart = ({
    usage,
    getUsageData,
    getLastMonthUsageData,
    getNextMonthUsageData
}) => {
    useEffect(() => {
        getUsageData()
    }, [])
    return (
        <div className={"flex-col flex-start gap-sm self-stretch p-xs shadow-border shadow-gray-3 rounded-md bg-gray-2"}>
            <div className="flex-row self-stretch justify-between">
                <div className="flex-row gap-xxs items-center">
                    {!usage.isFirst && <Button
                        variant="icon"
                        icon={Left}
                        iconSize="sm"
                        onClick={() => { getLastMonthUsageData() }}
                    />}
                    {digitToMonth(usage?.date?.getMonth(), usage?.date?.getFullYear())}
                    {!usage.isLast && <Button
                        variant="icon"
                        icon={Right}
                        iconSize="sm"
                        onClick={() => { getNextMonthUsageData() }}
                    />}
                </div>
            </div>
            <KeywordsBarChart data={usage?.data} dataKeyX={"name"} dataKeyY="usage" />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UsageChart)