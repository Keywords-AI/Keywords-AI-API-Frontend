import React from 'react';
import './style.css';

const CompareTable = ({ plans, features }) => {
    // Example format:
    // const plans = [
    //     { name: "Flex 8k", key: "f8k" },
    //     { name: "Flex 32k", key: "f32k" },
    //     { name: "Custom", key: "custom" },
    //   ];
      
    //   const features = [
    //     {
    //       title: "Free trial tokens",
    //       f8K: "40k",
    //       f32K: "40k",
    //       custom: "-",
    //     },
    return (
        <table className="pricing">
            <thead>
                <tr>
                    <th></th>
                    {plans.map((plan, index) => (
                        <th className="display-xs t-medium" key={index}>
                            {plan.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {features.map((feature, index) => (
                    <tr key={index}>
                        {Object.keys(feature).map((key, subIndex) => {
                            if (key !== "title") {
                                return (
                                    <td className="data" key={subIndex}>
                                        {feature[key]}
                                    </td>
                                );
                            } else {
                                return (
                                    <td className="text-md feature-col-td" key={subIndex}>
                                        {feature.title}
                                    </td>
                                );
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CompareTable;
