import React from "react";
import { Rocket, Edit } from "./icons";
import { Button } from "src/components";
import ConversationItem from "./components/ConversationItem";
import { connect } from "react-redux";

const mapStateToProps = (state) => {};
const mapDispatchToProps = {};

function ChatLeftDrawer({
  handleStop,
  createConversation,
  getConversations,
  // conversations,
  activeConversation,
  retrieveConversation,
  setActiveConversation,
  handleDelete,
  setPromptPopup,
}) {
  const conversations = [
    { id: 1, name: "Conversation 1 φαιξσδ΄ξφικα" },
    { id: 1, name: "Conversation 1 φαιξσδ΄ξφικα" },
  ];
  return (
    <div className="bg-gray-2 w-[280px] p-xs relative">
      <div
        className="flex-col justify-center items-center gap-sm self-stretch"
      >
        <Button
          variant="chat"
          icon={Rocket}
          className="self-stretch"
          text="New Chat"
        />
        <div className="flex-col flex-1 w-full max-h-[calc(100vh-200px)] ">
          <div className="self-stretch flex-col overflow-auto">
            {conversations?.map((conversation, index) => (
              <ConversationItem key={index} conversation={conversation} />
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="small"
        icon={Edit}
        text={"Custom prompt: " + ("on")}
        className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        onClick={() => setPromptPopup(true)}
      />
    </div>
  );
}

export default connect(null, null)(ChatLeftDrawer);