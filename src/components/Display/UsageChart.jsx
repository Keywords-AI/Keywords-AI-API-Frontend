import React from 'react'
import { connect } from 'react-redux'
import { KeywordsBarChart } from 'src/components/Display'
import { Button } from 'src/components/Buttons'
import { Up, Down } from 'src/components/Icons'
import { dightToMonth } from 'src/utilities/objectProcessing'

export const UsageChart = ({ month = "October",
    ...chartProps }) => {
    return (
        <div className={"flex-col flex-start gap-sm self-stretch p-xs border border-gray-3 rounded-md bg-gray-2"}>
            <div className="flex-row self-stretch justify-between">
                <div className="flex-row gap-xxs items-center">
                    <Button
                        variant="icon"
                        icon={Up}
                    />
                    {month}
                    <Button
                        variant="icon"
                        icon={Down}
                    />
                </div>
            </div>
            <KeywordsBarChart {...chartProps} />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UsageChart)