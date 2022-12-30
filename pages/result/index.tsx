import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ResultPage = () => {
  const [filters, setFilters] = useState<string[]>(["price", "cuisine"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <ResultContainer>
      <div>Results</div>
      <div>
        Filters
        {filters.map((item) => {
          return (
            <Filter
              key={item}
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
              }}>
              {item}
            </Filter>
          );
        })}
      </div>
      <div>Restaurants</div>

      <FullModalOuter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        motionPreset="slideInBottom">
        <ModalOverlay />
        <FullModal>
          <ModalHeader>Set Filters</ModalHeader>
          <CloseButton onClick={() => setIsFilterOpen(false)}>X</CloseButton>
          <ModalBody>내용</ModalBody>

          <ModalFooter>
            <Button
              width="100%"
              colorScheme="blue"
              onClick={() => setIsFilterOpen(false)}>
              Save
            </Button>
          </ModalFooter>
        </FullModal>
      </FullModalOuter>
    </ResultContainer>
  );
};

export default ResultPage;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Filter = styled(Button)`
  border-radius: 18px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.09);
`;

const FullModal = styled(ModalContent)`
  min-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  border-radius: 0px;
  top: 0px;
  margin: 0px;
`;

const FullModalOuter = styled(Modal)`
  padding: 0px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  padding: 10px 20px;
  background: red;
`;
