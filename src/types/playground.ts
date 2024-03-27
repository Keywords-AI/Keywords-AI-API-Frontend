type PlaygroundMessage = {
    id: string;
    role: "system" | "user" | "assistant";
    user_content?: string;
    responses: ResponseItem[] | null | undefined;
    hidden?: boolean;
  };
  type ResponseItem = {
    content: string;
    model: string;
    complete: boolean;
  } | null;