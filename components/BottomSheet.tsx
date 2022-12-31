import { Button, Input, Select, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import { isMobile } from "react-device-detect";
import Sheet from "react-modal-sheet";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../utils/fbase";

type BottomSheetProps = {
  isBottomOpen: boolean;
  setBottomOpen: Dispatch<SetStateAction<boolean>>;
};

const BottomSheet = ({ isBottomOpen, setBottomOpen }: BottomSheetProps) => {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const toast = useToast();

  const sendData = async () => {
    if (!v1 || !v2 || !v3) {
      toast({
        title: "Please fill all blanks",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newId = uuidv4();
    console.log("새로운 유저 아이디 생성 : ", newId);

    const body = {
      v1: v1,
      v2: v2,
      v3: v3,
      createdAt: new Date(),
    };
    await dbService.collection("user").add(body);
    localStorage.setItem("isSecondVisit", newId);
    setBottomOpen(false);
  };

  return (
    <CustomSheet
      isOpen={isBottomOpen}
      onClose={() => setBottomOpen(false)}
      detent="content-height">
      <Sheet.Container
        style={{
          width: isMobile ? "100%" : "900px",
          left: isMobile ? "0px" : "calc(50vw - 450px)",
        }}>
        <Sheet.Header />
        <Sheet.Content>
          <BottomModalContent>
            <div className="title">
              Only for the first time, we ask you a question
            </div>
            <div className="question">
              <div className="label">How old are you?</div>
              <Input
                placeholder="age"
                value={v1}
                onChange={(e) => setV1(e.currentTarget.value)}
              />
            </div>
            <div className="question">
              <div className="label">What{"'"}s your job?</div>
              <Select
                placeholder="Select option"
                value={v2}
                onChange={(e) => setV2(e.currentTarget.value)}>
                <option value="option1">Student</option>
                <option value="option2">Developer</option>
                <option value="option3">IT Engineer</option>
              </Select>
            </div>
            <div className="question">
              <div className="label">Where do you leave?</div>
              <Input
                placeholder="San francisco"
                value={v3}
                onChange={(e) => setV3(e.currentTarget.value)}
              />
            </div>
            <Button width="100%" onClick={() => sendData()}>
              Send
            </Button>
          </BottomModalContent>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </CustomSheet>
  );
};

export default React.memo(BottomSheet);

const CustomSheet = styled(Sheet)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomModalContent = styled.div`
  padding: 20px;
  .title {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.purple03};
  }
  .label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .question {
    padding: 15px 0px;
  }
  button {
    margin-top: 30px;
    bottom: 0px;
  }
`;
