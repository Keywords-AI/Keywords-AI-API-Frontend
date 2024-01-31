export type ChatMessage = {
  role: string;
  content: string;
};

export type ConversationMessage = ChatMessage & {
  conversation: number | undefined;
};
