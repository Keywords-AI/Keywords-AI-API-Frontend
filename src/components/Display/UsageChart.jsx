import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { KeywordsBarChart } from 'src/components/Display'
import { Button } from 'src/components/Buttons'
import { Up, Down } from 'src/components/Icons'
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
        <div className={"flex-col flex-start gap-sm self-stretch p-xs border border-gray-3 rounded-md bg-gray-2"}>
            <div className="flex-row self-stretch justify-between">
                <div className="flex-row gap-xxs items-center">
                    {!usage.isFirst && <Button
                        variant="icon"
                        icon={Up}
                        onClick={() => { getLastMonthUsageData() }}
                    />}
                    {digitToMonth(usage?.date?.getMonth())}
                    {!usage.isLast && <Button
                        variant="icon"
                        icon={Down}
                        onClick={() => { getNextMonthUsageData() }}
                    />}
                </div>
            </div>
            <KeywordsBarChart data={usage?.data} dataKeyX={"name"} dataKeyY="usage" />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UsageChart)