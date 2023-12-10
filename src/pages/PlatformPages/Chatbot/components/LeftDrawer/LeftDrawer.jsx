import React from "react";
import { Rocket, Edit } from "./icons";
export default function LeftDrawer({
  handleStop,
  createConversation,
  getConversations,
  conversations,
  activeConversation,
  retrieveConversation,
  setActiveConversation,
  handleDelete,
}) {
  return (
    <div className="bg-gray-2 w-[280px]">
      <div
        className="flex-col justify-center items-center gap-md self-stretch"
        style={{ height: "calc(100% - 64px)" }}
      >
        <button
          className="button-secondary-white"
          style={{
            width: "100%",
          }}
          onClick={() => {
            handleStop();
            createConversation();
            getConversations();
          }}
        >
          <Rocket />
          <span className="text-sm">New Chat</span>
        </button>
        <div
          className="flex-col flex-1   w-full"
          style={{
            overflow: "auto",
          }}
        >
          <div className="conversation-items w-full">
            {conversations?.map((conversationItem, index) => (
              <button
                key={index}
                className={
                  "button-secondary-black self-stretch" +
                  (conversationItem?.id === activeConversation ? " active" : "")
                }
                onClick={() => {
                  if (conversationItem?.id !== activeConversation) {
                    handleStop();
                    retrieveConversation(conversationItem?.id);
                    setActiveConversation(conversationItem?.id);
                  }
                }}
              >
                <div
                  className={"flex-row self-stretch flex-1   space-between items-center"}
                >
                  <div className="flex-row justify-center items-center gap-xs flex">
                    <ChatBox />
                    <div
                      className="text-sm text-white"
                      style={{
                        display: "flex",
                        maxWidth: "165px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conversationItem?.name}
                    </div>
                  </div>
                  <Delete
                    style={{ flex: "1" }}
                    handleDelete={() => handleDelete(conversationItem?.id)}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
