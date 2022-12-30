import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

type ChatInputType = {
  text: string;
  type?: "bot" | "user" | "result";
};

const ChatBubble = ({ text, type = "user" }: ChatInputType) => {
  return (
    <ChatBubbleContainer align={type !== "user" ? "flex-start" : "flex-end"}>
      {type === "result" ? (
        <ChatResult href="/result">{text}</ChatResult>
      ) : (
        <ChatBubbleOne type={type}>{text}</ChatBubbleOne>
      )}
    </ChatBubbleContainer>
  );
};

export default React.memo(ChatBubble);

const ChatBubbleContainer = styled.div<{ align: string }>`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  justify-content: ${({ align }) => align};
  align-content: ${({ align }) => align};
`;

const ChatBubbleOne = styled.div<{ type: string }>`
  padding: 12px;
  background: ${({ type }) =>
    type === "user" ? "rgba(0, 0, 20, 0.07)" : "rgba(110, 0, 120, 0.07)"};
  color: black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${({ type }) => (type === "user" ? "8px" : "0px")};
  border-bottom-right-radius: ${({ type }) =>
    type === "user" ? "0px" : "8px"};
  border: 1px solid black;

  max-width: 90%;
`;

const ChatResult = styled(Link)`
  border-radius: 8px;
  padding: 3px;
  width: 150px;
  text-align: center;
  background-color: rgba(213, 213, 231, 0.6);
`;
