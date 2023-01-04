import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import ChatBubble from "../../components/Chat/ChatBubble";
import styled from "@emotion/styled";
import { useRef } from "react";
import AppBar from "../../components/AppBar";
import { FIRST_QUESTION, useChatStore } from "../../utils/store";
import { ChatInput, InputWrapper } from "..";
import { ArrowForwardIcon, AtSignIcon } from "@chakra-ui/icons";
import router from "next/router";
import { ResponseType } from "../api/call";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export enum ChatType {
  BOT = "bot",
  USER = "user",
  RESULT = "result",
  LOADING = "loading",
}

const START_WHAT_TO_EAT = "What to eat?";

const ChatPage: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const {
    chats,
    key,
    filtered,
    validNum,
    dict,
    answer,
    setAnswer,
    setValidNum,
    setFiltered,
    setChats,
    setKey,
    setDict,
  } = useChatStore();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  let temp = 0;

  useEffect(() => {
    // set scroll to bottom.
    // chatRef.current &&
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chats]);

  useEffect(() => {
    if (router.query.isFromHome && temp === 0) {
      temp = 1;
      resetAll();
      router.replace("/chat", undefined, { shallow: true });
      submitChat(router.query.text as string);
    }
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleClick = async (input: any) => {
    try {
      console.log("인풋으로 들어가는게 뭐? ", input);
      const response = await fetch("/api/call", {
        method: "POST",
        body: JSON.stringify({
          input: input,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const output = await response.json();

      const body: ResponseType = {
        question: output[0],
        answer: output[1],
        key: output[2],
        dict: output[3],
        valid_num: output[4],
      };

      setQuestion(body.question);
      setAnswer(body.answer);
      setKey(body.key);
      setDict(body.dict);
      setValidNum(body.valid_num);

      let copiedFilter = filtered;
      copiedFilter.push({
        key: body.key,
        answerList: body.answer,
        answer: "",
      });
      Object.entries(body.dict).map((entry) => {
        copiedFilter?.map((item: any) => {
          if (
            (!item.answer || item.answer.length === 0) &&
            item.key === entry[0]
          ) {
            item.answer = entry[1];
          }
        });
      });
      setFiltered(copiedFilter);

      return body;
    } catch (error) {}

    setLoading(false);
  };

  const sendQuery = async (text: string) => {
    const response = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({
        query: text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const output = await response.json();

    console.log(output, "ㅇ아웃 2");

    return output;
  };

  const submitChat = async (text: string) => {
    if (loading) return;
    if (text.length === 0) {
      toast({
        position: "top",
        title: "You have to type something to send",
        duration: 2000,
        status: "warning",
        icon: <></>,
      });
      return;
    }

    // send user chat
    let chatsCopied = [...chats];
    chatsCopied.push({
      type: ChatType.USER,
      text: text,
    });
    setChats([...chatsCopied]);
    setInput("");

    let output: ResponseType | undefined;

    const answerList = answer.map((item) =>
      item.replace(/`s/gi, "").toLowerCase()
    );

    // It is response situation now and proper answer.
    if (
      answerList.length > 0 &&
      answerList.includes(text.replace(/`s/gi, "").toLowerCase())
    ) {
      setChats([
        ...chatsCopied,
        {
          type: ChatType.BOT,
          text: "loading...",
        },
      ]);

      let copiedDict: any = dict;
      if (key === "atmosphere") copiedDict[key] = [text];
      else copiedDict[key] = text;

      output = await handleClick(copiedDict);
    } else if (text === START_WHAT_TO_EAT) {
      // if user asked What To Eat
      chatsCopied.push({
        type: ChatType.BOT,
        text: "😁 Okay let me guess what restaurant you would love the most!",
      });
      setChats([...chatsCopied]);
      const input = {};
      output = await handleClick(input);
    } else if (question) {
      // if it is response situation but not proper answer.
      toast({
        position: "top",
        title: "Please answer to the question",
        duration: 2000,
        status: "warning",
        icon: <></>,
      });
      return;
    } else {
      // first question.
      console.log("It is the First question.");
      const firstFilters = sendQuery(text);
      // setChats([...chatsCopied]);
      const input = { ...firstFilters };
      output = await handleClick(input);
    }

    setLoading(true);

    // only show result button at the latest chat so delete all.
    chatsCopied = chatsCopied.filter((doc) => doc.type !== ChatType.RESULT);
    // only show result button when filter is more than 2.
    if (validNum >= 2) {
      chatsCopied.push({
        type: ChatType.RESULT,
        text: "see results",
      });
    }
    chatsCopied.push({
      type: ChatType.BOT,
      text: output?.question as string,
      options: output?.answer,
      questionKey: output?.key,
    });
    setChats([...chatsCopied]);
    setLoading(false);
  };

  const startWhatToEat = () => {
    resetPastDatas();
  };

  useEffect(() => {
    if (input === START_WHAT_TO_EAT) submitChat(input);
  }, [filtered]);

  const resetAll = () => {
    setChats([FIRST_QUESTION]);
  };

  const resetPastDatas = () => {
    setQuestion("");
    setAnswer([]);
    setDict({});
    setValidNum(0);
    setFiltered([]);
    setKey("");
    setInput(START_WHAT_TO_EAT);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />

      <ChatContainer ref={chatRef}>
        {chats.map((item, index) => {
          switch (item.type) {
            case ChatType.USER:
              return <ChatBubble key={index} text={item.text} />;
            case ChatType.BOT:
              return (
                <ChatBubble
                  key={index}
                  text={item.text}
                  type={item.type}
                  options={item.options}
                  submitChat={submitChat}
                  questionKey={item.questionKey}
                />
              );
            case ChatType.RESULT:
              return (
                <ChatBubble key={index} text={item.text} type={item.type} />
              );
            default:
              return <></>;
          }
        })}

        <AtSignIcon
          bgColor="purple.600"
          color="white"
          padding={4}
          borderRadius={3}
          onClick={() => resetAll()}
        />
        <InputWrapperFixed
          onSubmit={(e: any) => {
            submitChat(input);
            e.preventDefault();
          }}>
          <ChatInput
            focusBorderColor="none"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Type anything..."
          />
          <span className="icon" onClick={(e) => submitChat(input)}>
            <ArrowForwardIcon color="whiteAlpha.800" />
          </span>
          <div className="dontknow">
            Don{"'"}t know what to eat?{" "}
            <span onClick={() => startWhatToEat()}>Let us Do!</span>
          </div>
        </InputWrapperFixed>
      </ChatContainer>
    </>
  );
};

export default ChatPage;

const InputWrapperFixed = styled(InputWrapper)`
  position: fixed;
  bottom: 20px;
  width: 900px;
  display: flex;
  flex-direction: column;

  .dontknow {
    padding: 4px;
    font-size: 15px;
    color: ${({ theme }) => theme.textColor02};
    span {
      font-weight: 600;
      color: ${({ theme }) => theme.purple03};
    }
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  padding-bottom: 120px;
  overflow: scroll;
  max-height: 90vh;
`;
