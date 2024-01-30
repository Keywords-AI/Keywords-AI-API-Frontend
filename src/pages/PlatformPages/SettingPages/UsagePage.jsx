import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { ProgressBar, UsageChart } from "src/components/Display";
import { getUsageData } from "src/store/actions";

const mapStateToProps = (state) => ({
  usage: state.usage,
  user: state.user,
});

const mapDispatchToProps = {
  getUsageData,
};

export const UsagePage = ({ usage }) => {
  const creditsTotal = usage?.freeCredits?.creditsTotal;
  const creditsUsed = creditsTotal - usage?.freeCredits?.creditsRemaining;
  return (
    <PageContent title="Usage" subtitle="Manage and track your API usage.">
      <PageParagraph
        heading="Spendings"
        subheading="Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
      >
        <UsageChart dataKeyX={"name"} dataKeyY="usage" />
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading="Credits"
        subheading="Initial token credit assignment based on your plan. You will be
        charged usage-based only after using all your credits."
      >
        <ProgressBar
          name={"Free trial"}
          progressLegend={"Used"}
          remainLegend={"Credits remaining"}
          progressColorClass={"bg-gray-5"}
          remainColorClass={"bg-gray-1"}
          current={30}
          total={100}
          display={(current, total) => `$${current} / $${total}`}
        />
      </PageParagraph>
    </PageContent>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsagePage);
