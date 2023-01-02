import { Input, Button, Select, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons";
import { useChatStore } from "../utils/store";
import ChatBubble from "../components/Chat/ChatBubble";
import { ChatType } from "./chat";
import router from "next/router";
import Footer from "../components/Footer";
import BottomSheet from "../components/BottomSheet";
import Image from "next/image";

const TAGS = [
  "I want to go to japanese restaurant which is cozy and dog-allowed",
  "I want to go to chinese restaurant which is cozy and dog-allowed",
  "I want to go to korean restaurant which is cozy and dog-allowed",
];

const Home: NextPage = () => {
  const [isBottomOpen, setBottomOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { darkMode, setDarkMode, chats, setChats } = useChatStore();
  const toast = useToast();

  const submit = () => {
    if (!value) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const isSecond = localStorage.getItem("isSecondVisit");
    if (!isSecond) {
      // 입력 받아야함
      console.log("입력 받아야함");
      setBottomOpen(true);
    } else {
      // 바로 입력으로 가면 됨
      console.log("바로 가면됨");
      router.push({
        pathname: "/chat",
        query: { isFromHome: true, text: value },
      });
    }
  };

  return (
    <>
      <HomeConatiner>
        <button onClick={() => setDarkMode(!darkMode)}>dark</button>
        <Title>
          <span className="img_wrapper">
            <ChatIcon color="whiteAlpha.800" boxSize={6} />
          </span>
          <div className="title">Welcome to Dice-chat</div>
          <div className="sub">
            Type anything for finding restaurants you want.
          </div>
        </Title>
        <br />
        <ChatBox>
          <ChatBubble type={chats[0].type} text={chats[0].text} />
          <InputWrapper
            onSubmit={(e) => {
              submit();
              e.preventDefault();
            }}>
            <ChatInput
              focusBorderColor="none"
              ref={inputRef}
              placeholder="Type anything to find restaurants for you"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.currentTarget.value)
              }
            />
            <span className="icon" onClick={(e) => submit()}>
              <ArrowForwardIcon color="whiteAlpha.800" />
            </span>
          </InputWrapper>
        </ChatBox>
        <InfoContainer>
          <div className="label">or try one of these prompts:</div>
          <div className="tags">
            {TAGS.map((item, index) => {
              return (
                <Tag
                  key={index}
                  onClick={(e) => {
                    setValue(item);
                    const timeOut = setTimeout(() => {
                      submit();
                      clearTimeout(timeOut);
                    }, 500);
                  }}>
                  {item}
                </Tag>
              );
            })}
          </div>
        </InfoContainer>
        <ExampleContainer>대화를 캡처해서 들어가게 될 화면</ExampleContainer>
        <Button onClick={() => setBottomOpen(true)}>Open sheet</Button>
        <BottomSheet
          isBottomOpen={isBottomOpen}
          setBottomOpen={setBottomOpen}
        />
      </HomeConatiner>
      <Footer />
    </>
  );
};

export default Home;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0px;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;

  color: ${({ theme }) => theme.color};

  .tags {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
  .label {
  }
`;

const Tag = styled.button`
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background: ${({ theme }) => "#aa00aa" + "66"};
  margin: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor01};
  text-align: start;
  transition: 0.2s all;
  color: #000000aa;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => "#aa00aa" + "99"};
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const InputWrapper = styled.form`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 50px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 16px;
    background-color: ${({ theme }) => theme.purple03};
    width: 32px;
    height: 32px;
    border-radius: 50px;
    z-index: 1;
    cursor: pointer;
  }
`;

const HomeConatiner = styled.div`
  width: 100%;
  padding: 120px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  .img_wrapper {
    background-color: ${({ theme }) => theme.bgColor01};
    padding: 16px 15px;
    border-radius: 50px;
  }

  .title {
    font-size: 32px;
    font-weight: 800;
    color: ${({ theme }) => theme.purple03};
    margin-top: 18px;
  }

  .sub {
    font-weight: 600;
    margin-top: 6px;
    font-size: 18px;
    color: ${({ theme }) => theme.textColor02};
  }
  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const ChatInput = styled(Input)`
  width: 100%;
  border-radius: 8px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 31px 16px;
  // border: 2px solid ${({ theme }) => theme.bgColor01};
  background-color: ${({ theme }) => theme.bgColor02};
  color: ${({ theme }) => theme.color};
  outline: none;
  transition: 0.2s all;

  &:hover {
    // border: 2px solid ${({ theme }) => theme.bgColor01};
  }

  &:focus {
    outline: 2.5px solid rgba(250, 250, 250, 0.3);
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ChatBox = styled.div`
  width: 100%;
  padding: 50px 10px 30px 10px;
  background: rgba(245, 245, 245, 0.5);
  border-radius: 6px;
  box-shadow: 3px 3px 18px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
