import React, { useState, useEffect, useRef } from "react";

// Custom Hook for auto scrolling
function useAutoScroll() {
  /*
  returns: { conversationBoxRef, generatingText, setGeneratingText }
  conversationRef: ref to the conversation box, the parent you are scrolling.
  generatingText: the text that is being generated, used to trigger a scroll.
  setGeneratingText: function to set the generatingText.
  */
  const [generatingText, setGeneratingText] = useState("");
  const [conversationHeight, setConversationHeight] = useState(0);
  const conversationBoxRef = useRef<HTMLDivElement>(null);
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
        // console.log(
        //   "clientHeight",
        //   conversationBox.clientHeight,
        //   "scrollHeight",
        //   conversationBox.scrollHeight,
        //   "scrollTop",
        //   conversationBox.scrollTop
        // );
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
