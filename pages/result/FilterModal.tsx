import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { QuestionType, useChatStore } from "../../utils/store";
import styled from "@emotion/styled";
import { CloseButton, FilterDefault, FullModal, FullModalOuter } from ".";
import { CloseIcon } from "@chakra-ui/icons";

type FilterModalProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterModal = ({ isFilterOpen, setIsFilterOpen }: FilterModalProps) => {
  const { filtered, setFiltered } = useChatStore();
  const [tempFilters, setTempFilters] = useState<QuestionType[]>();

  useEffect(() => {
    setTempFilters(filtered);
  }, [isFilterOpen]);

  const onClickChangeFilter = (key: string, value: string) => {
    const changed = tempFilters?.map((doc) => {
      if (doc.key === key) {
        return {
          ...doc,
          answer: value,
        };
      } else {
        return doc;
      }
    });
    setTempFilters(changed);
  };

  const saveChanges = () => {
    setFiltered(tempFilters);
    setIsFilterOpen(false);
  };

  return (
    <FullModalOuter
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <FullModal>
        <ModalHeader>Filters</ModalHeader>
        <CloseButton onClick={() => setIsFilterOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <ModalBody>
          {tempFilters?.map((item, i) => {
            if (item.answer)
              return (
                <FilterContainer key={i}>
                  <div className="label">{item.key}</div>
                  <div className="filters">
                    {item.answerList.map((doc, index) => {
                      if (doc === item.answer || item.answer.includes(doc))
                        return (
                          <Filter chosen key={index}>
                            {doc}
                          </Filter>
                        );
                      else
                        return (
                          <Filter
                            key={index}
                            onClick={() => onClickChangeFilter(item.key, doc)}>
                            {doc}
                          </Filter>
                        );
                    })}
                  </div>
                </FilterContainer>
              );
          })}
        </ModalBody>

        <ModalFooter>
          <Button width="100%" colorScheme="blue" onClick={() => saveChanges()}>
            Save
          </Button>
        </ModalFooter>
      </FullModal>
    </FullModalOuter>
  );
};

export default React.memo(FilterModal);

const Filter = styled.button<{ chosen?: boolean }>`
  border-radius: 30px;
  padding: 4px 16px;
  display: flex;
  background-color: ${({ theme }) => theme.purple02};
  border: 1px solid ${({ theme }) => theme.borderColor01};
  margin-right: 5px;
  border-radius: 30px;
  padding: 4px 16px;
  background: ${({ chosen, theme }) =>
    chosen ? theme.purple01 : theme.bgColor02};
  margin-top: 6px;
`;
const FilterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  .filters {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    flex-wrap: wrap;
  }

  .label {
    font-weight: 600;
    padding: 5px 0px;
  }
`;
