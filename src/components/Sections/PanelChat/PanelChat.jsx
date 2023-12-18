import React, { useEffect } from "react";
import { Rocket, Edit } from "./icons";
import { Button, Pencil } from "src/components";
import { ConversationItem, CustomPrompt } from "./components";
import { connect } from "react-redux";
import { Modal } from "src/components/Dialogs";
import {
  setIsEditing,
  getConversations,
  deleteConversation,
  createConversation,
} from "src/store/actions/"

const mapStateToProps = (state) => {
  return {
    chatbot: state.chatbot,
  }
};
const mapDispatchToProps = {
  setIsEditing,
  getConversations,
  createConversation
};

function ChatLeftDrawer({
  deleteConversation,
  createConversation,
  getConversations,
  setIsEditing,
  chatbot,
  
}) {
  const conversations = chatbot?.conversations;
  const [isHovered, setIsHovered] = React.useState(false);
  useEffect(() => { getConversations() }, [])
  return (
    <div className="bg-gray-2 w-[280px] p-xs relative">
      <div
        className="flex-col justify-center items-center gap-sm self-stretch"
      >
        <Button
          variant="chat"
          icon={Rocket}
          iconHoverFill="fill-gray-white"
          className="self-stretch"
          text="New Chat"
          iconPosition="left"
          onClick={() => {
            createConversation();
          }}
        />
        <div className="flex-col flex-1 w-full max-h-[calc(100vh-200px)] ">
          <div className="self-stretch flex-col overflow-auto">
            {conversations?.map((conversation) => {
              return (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Custom prompt"
        subtitle="Add a system prompt or upload files. Custom settings coming soon."
        open={chatbot.isEditing}
        setOpen={setIsEditing}
        trigger={<Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant="small"
          icon={Pencil}
          text={"Custom prompt: " + ("on")}
          className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          onClick={() => { setIsEditing(true) }}
          iconHoverFill="fill-gray-white"
        />}
      >
        <CustomPrompt />
      </Modal>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLeftDrawer);