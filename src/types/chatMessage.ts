export type ChatMessage = {
  role: string;
  content: string;
  model: string | null;
  
};

export type ConversationMessage = ChatMessage & {
  conversation: number | undefined;
};
