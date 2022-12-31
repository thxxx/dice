import { Button, Skeleton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { ChatType } from "../../pages/chat";

const BR = "12px";

type ChatInputType = {
  text: string;
  type?: ChatType;
};

const ChatBubble = ({ text, type = ChatType.USER }: ChatInputType) => {
  return (
    <ChatBubbleContainer align={type !== "user" ? "flex-start" : "flex-end"}>
      {type === ChatType.RESULT ? (
        <ChatResult href="/result">{text}</ChatResult>
      ) : type === ChatType.BOT && text === "loading..." ? (
        <ChatBubbleOne type={type}>
          <h1>Finding...</h1>
        </ChatBubbleOne>
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
  padding: 15px 22px;
  background: ${({ type, theme }) =>
    type === "user" ? theme.purple01 : theme.botChat};
  color: black;
  border-top-left-radius: ${BR};
  border-top-right-radius: ${BR};
  border-bottom-left-radius: ${({ type }) => (type === "user" ? BR : "0px")};
  border-bottom-right-radius: ${({ type }) => (type === "user" ? "0px" : BR)};
  border: 1px solid ${({ theme }) => theme.borderColor01};

  max-width: 90%;
`;

const ChatResult = styled(Link)`
  border-radius: ${BR};
  padding: 3px;
  width: 150px;
  text-align: center;
  background-color: rgba(213, 213, 231, 0.6);
`;
