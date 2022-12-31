import { Input, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons";
import { useChatStore } from "../utils/store";
import ChatBubble from "../components/Chat/ChatBubble";
import { ChatType } from "./chat";
import Sheet from "react-modal-sheet";
import router from "next/router";

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

  const submit = () => {
    if (!value) return;
    console.log("클릭해서 이동");
    const isSecond = localStorage.getItem("isSecondVisit");
    if (!isSecond) {
      // 입력 받아야함
      console.log("입력 받아야함");
      setBottomOpen(true);
    } else {
      // 바로 입력으로 가면 됨
      console.log("바로 가면됨");
      setChats([
        ...chats,
        {
          type: ChatType.USER,
          text: value,
        },
      ]);
      router.push("/chat");
    }
  };

  const sendData = () => {
    localStorage.setItem("isSecondVisit", "true");
    setBottomOpen(false);
  };

  return (
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
      <Button onClick={() => setBottomOpen(true)}>Open sheet</Button>
      <Sheet isOpen={isBottomOpen} onClose={() => setBottomOpen(false)}>
        <Sheet.Container style={{ width: "900px" }}>
          <Sheet.Header />
          <Sheet.Content>
            <div>
              <Input />
              <Button width="90%" onClick={() => sendData()}>
                Send
              </Button>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </HomeConatiner>
  );
};

export default Home;

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
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .label {
  }
`;

const Tag = styled.button`
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 13px;
  background: ${({ theme }) => "#aa00aa" + "66"};
  margin: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor01};
  text-align: start;
  transition: 0.2s all;
  color: ${({ theme }) => theme.color + "bb"}

  &:hover {
    background: ${({ theme }) => "#aa00aa" + "99"};
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
    top: 10px;
    background-color: ${({ theme }) => theme.purple03};
    width: 32px;
    height: 32px;
    border-radius: 50px;
    z-index: 1;
    cursor: pointer;
  }
`;

const HomeConatiner = styled.div`
  width: 70%;
  padding: 40px 12px;
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
  padding: 25px 14px;
  // border: 2px solid ${({ theme }) => theme.bgColor01};
  background-color: ${({ theme }) => theme.bgColor02};
  color: ${({ theme }) => theme.color};
  outline: none;
  transition: 0.2s all;

  &:hover {
    // border: 2px solid ${({ theme }) => theme.bgColor01};
  }

  // border: 2px solid ${({ theme }) => theme.bgColor01};
  &:focus {
    outline: 2.5px solid rgba(250, 250, 250, 0.3);
  }
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const ChatBox = styled.div`
  width: 100%;
  padding: 50px 10px 30px 10px;
  background: rgba(245, 245, 245, 0.3);
  border-radius: 6px;
`;
