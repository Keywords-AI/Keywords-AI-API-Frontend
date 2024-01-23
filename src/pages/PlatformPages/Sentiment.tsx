import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  setSidePanelOpen,
  setSelectedRequest,
} from "src/store/actions";
import { getRequestLogs } from "src/store/actions";
import { Add, Button, Close, Down, Export, Filter } from "src/components";
import { SideBar, SideBarActive } from "src/components/Icons";
import { SelectInput } from "src/components/Inputs";
import { RequestLogTable } from "src/components/Tables";
import { CopyButton, DotsButton, IconButton } from "src/components/Buttons";
import { WelcomeState } from "src/components/Sections";
import { SentimentChart } from "src/components/Display";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export const SentimentNotConnected = ({}) => {
  return (
    <div className="flex flex-col p-lg gap-lg h-full w-full items-stretch">
      <span className="text-gray-5 display-xs">
        Sentiment Analytics{" "}
        <span className="caption text-gray-4">{"(building in progress)"}</span>
      </span>
      <div className="flex flex-col gap-sm">
        <div className="flex flex-row gap-sm">
          <div className="flex w-fit flex-col bg-gray-2 rounded-lg py-xs px-sm">
            <span className="text-gray-5 text-md-medium">Breakdown</span>
            <SentimentChart />
          </div>
          <div className="flex flex-col bg-gray-2 rounded-lg py-xs px-sm w-full">
            <span className="text-gray-5 text-md-medium">
              Sentiment over time
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-sm h-full">
          <div className="flex flex-col bg-gray-2 rounded-lg py-xs px-sm w-full h-[200px]">
            <span className="text-gray-5 text-md-medium">
              Sentiment by Topic
            </span>
          </div>
          <div className="flex flex-col bg-gray-2 rounded-lg py-xs px-sm w-full">
            <span className="text-gray-5 text-md-medium">Intent</span>
          </div>
        </div>
      </div>

      <span className="caption text-gray-4">
        Note 1/23: More graphs coming in the next few days! - Hendrix
      </span>
    </div>
  );
};

export const Sentiment = connect(
  mapStateToProps,
  mapDispatchToProps
)(SentimentNotConnected);
