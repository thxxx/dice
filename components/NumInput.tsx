import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const NumInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  return (
    <NumInputContainer>
      <Button
        size="lg"
        style={{
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
        onClick={() => {
          if (value > 1) onChange(value - 1);
        }}>
        -
      </Button>
      <Input
        size="lg"
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
      />
      <Button
        style={{
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
        size="lg"
        onClick={() => {
          if (value < 10) onChange(value + 1);
        }}>
        +
      </Button>
    </NumInputContainer>
  );
};

export default React.memo(NumInput);

const NumInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 180px;
  margin-top: 10px;

  input {
    text-align: center;
    border-radius: 0px;
    border-left: none;
    border-right: none;
  }
`;
