import React, { useState } from "react";
import {
  Building,
  Cost,
  Divider,
  JavaScript,
  Quality,
  Send,
  User,
  Warning,
} from "src/components";
import { IconButton } from "src/components/Buttons";
import { PageContent, PageParagraph } from "src/components/Sections";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Admin() {
  const [isCustomerPanelHovered, setIsCustomerPanelHovered] = useState(false);
  const [isUsageDashboardHovered, setIsUsageDashboardHovered] = useState(false);
  const [isDjangoAdminHovered, setIsDjangoAdminHovered] = useState(false);
  const [isQAWallHovered, setIsQAWallHovered] = useState(false);
  const [isChatbotHovered, setIsChatbotHovered] = useState(false);
  const [isCacheHovered, setIsCacheHovered] = useState(false);
  const [isSentimentHovered, setIsSentimentHovered] = useState(false);

  const navigate = useNavigate();

  return (
    // <div className="flex flex-col py-lg pr-[240px] pl-xl items-start gap-md flex-1 self-stretch">

    // </div>

    <PageContent title="Admin" subtitle="For Keywords AI internal use only.">
      <PageParagraph
        heading="Admin views"
        subheading="Internal panels, dashboards, and pages."
      >
        <div
          className="grid grid-cols-3
         items-start content-start gap-xxs self-stretch flex-wrap"
        >
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsCustomerPanelHovered(true)}
            onMouseLeave={() => setIsCustomerPanelHovered(false)}
            onClick={() => navigate("/platform/customers")}
          >
            <div className="flex items-center gap-xxs">
              <IconButton icon={User} active={isCustomerPanelHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Customers panel
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsUsageDashboardHovered(true)}
            onMouseLeave={() => setIsUsageDashboardHovered(false)}
            // onClick={() => navigate('/platform/customers')}
          >
            <div className="flex items-center gap-xxs">
              <IconButton icon={Quality} active={isUsageDashboardHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Usage dashboard
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsDjangoAdminHovered(true)}
            onMouseLeave={() => setIsDjangoAdminHovered(false)}
            onClick={() =>
              (window.location.href =
                "https://api.keywordsai.co/admin-panel-for-keywordsai-admin-users/login/?next=/admin-panel-for-keywordsai-admin-users/")
            }
          >
            <div className="flex items-center gap-xxs">
              <IconButton icon={Building} active={isDjangoAdminHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Django admin
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsQAWallHovered(true)}
            onMouseLeave={() => setIsQAWallHovered(false)}
            onClick={() => navigate("/platform/qa-wall")}
          >
            {" "}
            <div className="flex items-center gap-xxs">
              <IconButton icon={JavaScript} active={isQAWallHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  QA wall
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading="Backlog features"
        subheading="Low priority features development in progress."
      >
        <div
          className="grid grid-cols-3
         items-start content-start gap-xxs self-stretch flex-wrap"
        >
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsChatbotHovered(true)}
            onMouseLeave={() => setIsChatbotHovered(false)}
            onClick={() => navigate("/platform/chatbot")}
          >
            <div className="flex items-center gap-xxs">
              <IconButton icon={Send} active={isChatbotHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Chatbot
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsCacheHovered(true)}
            onMouseLeave={() => setIsCacheHovered(false)}
            onClick={() => navigate("/platform/cache")}
          >
            <div className="flex items-center gap-xxs">
              <IconButton icon={Cost} active={isCacheHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Cache
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row min-w-[200px] py-md px-sm justify-center items-center gap-xxs flex-1 rounded-sm shadow-border shadow-gray-2 bg-gray-1 hover:shadow-gray-3 hover:bg-gray-2 cursor-pointer"
            onMouseEnter={() => setIsSentimentHovered(true)}
            onMouseLeave={() => setIsSentimentHovered(false)}
            // onClick={() => navigate('/platform/customers')}
          >
            {" "}
            <div className="flex items-center gap-xxs">
              <IconButton icon={Warning} active={isSentimentHovered} />
              <div className="flex flex-row items-center gap-xxs">
                <span className="text-sm-md text-center text-gray-4">
                  Sentiment
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageParagraph>
    </PageContent>
  );
}
