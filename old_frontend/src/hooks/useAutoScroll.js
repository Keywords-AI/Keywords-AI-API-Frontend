import { useState, useEffect, useRef } from "react";

// Custom Hook for auto scrolling
function useAutoScroll() {
  const [generatingText, setGeneratingText] = useState("");
  const [conversationHeight, setConversationHeight] = useState(0);
  const conversationBoxRef = useRef(null);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  useEffect(() => {
    if (conversationBoxRef.current) {
      setConversationHeight(conversationBoxRef.current.scrollHeight);
    }
  }, [generatingText]);

  useEffect(() => {
    const conversationBox = conversationBoxRef.current;
    if (conversationBox) {
      const onScroll = () => {
        const atBottom =
          conversationBox.scrollTop + conversationBox.clientHeight >=
          conversationBox.scrollHeight - 5;
        console.log(
          "clientHeight",
          conversationBox.clientHeight,
          "scrollHeight",
          conversationBox.scrollHeight,
          "scrollTop",
          conversationBox.scrollTop
        );
        setIsUserAtBottom(atBottom);
      };

      conversationBox.addEventListener("scroll", onScroll);
      return () => {
        conversationBox.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  useEffect(() => {
    const conversationBox = conversationBoxRef.current;
    if (conversationBox && isUserAtBottom) {
      conversationBox.scrollTop = conversationBox.scrollHeight;
    }
  }, [conversationHeight]);

  return { conversationBoxRef, generatingText, setGeneratingText };
}

export default useAutoScroll;
