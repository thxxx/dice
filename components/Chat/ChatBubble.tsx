import styled from "@emotion/styled";
import React from "react";

type ChatInputType = {
  text: string;
};

const ChatBubble = ({ text }: ChatInputType) => {
  return (
    <ChatBubbleContainer>
      <ChatBubbleOne>{text}</ChatBubbleOne>
    </ChatBubbleContainer>
  );
};

export default ChatBubble;

const ChatBubbleContainer = styled.div`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
`;

const ChatBubbleOne = styled.div`
  padding: 12px;
  background: rgba(0, 0, 20, 0.07);
  color: black;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;
