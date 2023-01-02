import { Button, Skeleton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { ChatType } from "../../pages/chat";
import { useChatStore } from "../../utils/store";

const BR = "12px";

export type ChatInputType = {
  text: string;
  type?: ChatType;
  options?: string[];
  submitChat?: (text: string) => void;
  questionKey?: string;
};

const ChatBubble = ({
  text,
  type = ChatType.USER,
  options,
  submitChat,
  questionKey,
}: ChatInputType) => {
  const { key } = useChatStore();

  const returnBubble = () => {
    switch (type) {
      case ChatType.RESULT:
        return <ChatResult href="/result">{text}</ChatResult>;
      case ChatType.BOT:
        if (text === "loading...") {
          return (
            <ChatBubbleOne type={type}>
              <h1>Finding...</h1>
            </ChatBubbleOne>
          );
        } else {
          return (
            <ChatBubbleOne type={type}>
              {text}
              {options && (
                <ChatOptions>
                  {options?.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={(e) => {
                          if (questionKey === key)
                            submitChat && submitChat(item);
                        }}>
                        {item}
                      </button>
                    );
                  })}
                </ChatOptions>
              )}
            </ChatBubbleOne>
          );
        }
      case ChatType.USER:
        return <ChatBubbleOne type={type}>{text}</ChatBubbleOne>;
      default:
        return <></>;
    }
  };
  return (
    <ChatBubbleContainer align={type !== "user" ? "flex-start" : "flex-end"}>
      {returnBubble()}
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
  border-radius: 20px;
  padding: 3px;
  width: 150px;
  text-align: center;
  background-color: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.darkGrey};
`;

const ChatOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  flex-wrap: wrap;

  button {
    margin-top: 5px;
    padding: 3px 14px;
    border-radius: 40px;
    margin-right: 6px;
    font-size: 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(250, 250, 250, 0.8);

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
`;
