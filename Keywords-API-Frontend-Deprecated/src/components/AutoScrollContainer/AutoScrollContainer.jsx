import React from "react";

export const AutoScrollContainer = ({
  children,
  percentageThreshold = 10,
  style,
  className,
}) => {
  const containerRef = React.useRef(null);
  const endRef = React.useRef(null);
  const [isUserAtBottom, setIsUserAtBottom] = React.useState(true);
  const [previousHeight, setPreviousHeight] = React.useState(null);
  const [heightChange, setHeightChange] = React.useState(0);
  React.useEffect(() => {
    if (isUserAtBottom && heightChange)
      endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [heightChange]);
  const handleOnScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (
      scrollTop + clientHeight >=
      scrollHeight - scrollHeight * (percentageThreshold / 100)
    ) {
      setIsUserAtBottom(true);
    } else {
      setIsUserAtBottom(false);
    }
  };

  React.useEffect(() => {
    const container = containerRef.current;
    const currentHeight = container.scrollHeight;

    if (previousHeight !== null && currentHeight !== previousHeight) {
      setHeightChange(currentHeight - previousHeight);
    } else {
      setHeightChange(0);
    }

    setPreviousHeight(currentHeight);
  }, [children]);

  return (
    <div
      style={{ ...style, overflowY: "auto" }}
      className={className}
      ref={containerRef}
      onScroll={handleOnScroll}
    >
      {children}
      <div ref={endRef}></div>
    </div>
  );
};
