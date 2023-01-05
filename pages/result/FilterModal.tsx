import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import {
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  Input,
} from "@chakra-ui/react";
import { QuestionType, useChatStore } from "../../utils/store";
import styled from "@emotion/styled";
import { CloseButton, FilterDefault, FullModal, FullModalOuter } from ".";
import { CloseIcon } from "@chakra-ui/icons";
import { ats } from "./atmosphere";
import { foods } from "./foods";

type FilterModalProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterModal = ({ isFilterOpen, setIsFilterOpen }: FilterModalProps) => {
  const { filtered, setFiltered } = useChatStore();
  const [tempFilters, setTempFilters] = useState<QuestionType[]>();
  const [word, setWord] = useState<string>("");
  const [foodWord, setFoodWord] = useState<string>("");

  useEffect(() => {
    console.log("ㅍ피ㄹ터ㄹ", filtered);
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

  const MultiSelect = (item: QuestionType) => {
    let items;
    if (item.key === "atmosphere") items = ats;
    else if (item.key === "cuisine") items = foods;
    else items = ats;

    const wor = item.key === "atmosphere" ? word : foodWord;

    return (
      <div>
        <Input
          value={wor}
          onChange={(e) => {
            item.key === "atmosphere"
              ? setWord(e.currentTarget.value)
              : setFoodWord(e.currentTarget.value);
          }}
        />
        {wor.length > 1 &&
          tempFilters &&
          items.filter((doc) => doc.includes(wor)).length > 0 && (
            <MultiSelectOptions>
              {items
                .filter(
                  (doc) => doc.includes(wor) && !item.answer.includes(doc)
                )
                .map((data) => (
                  <div
                    className="option"
                    key={data}
                    onClick={() => {
                      let addedFilters = [...tempFilters];
                      addedFilters = addedFilters.map((df) => {
                        if (df.key === item.key) {
                          return {
                            ...item,
                            answer: [...item.answer, data],
                          };
                        } else {
                          return {
                            ...df,
                          };
                        }
                      });
                      setTempFilters([...addedFilters]);
                    }}>
                    {data}
                  </div>
                ))}
            </MultiSelectOptions>
          )}
      </div>
    );
  };

  const returnFiltered = (item: QuestionType) => {
    if (!item.answer) return;
    if (item.key === "atmosphere" || item.key === "cuisine") {
      if (typeof item.answer === "string") return;
      return (
        <>
          {item.answer.map((doc, index) => {
            return (
              <Filter padding={5} borderRadius="full" chosen key={index}>
                <TagLabel>{doc}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    console.log("이 태그 삭제");
                    if (tempFilters) {
                      let addedFilters = [...tempFilters];
                      addedFilters = addedFilters.map((df) => {
                        if (
                          df.key === "atmosphere" &&
                          item.key === "atmosphere"
                        ) {
                          return {
                            ...item,
                            answer: item.answer.filter((ia: any) => ia !== doc),
                          };
                        }
                        if (df.key === "cuisine" && item.key === "cuisine") {
                          return {
                            ...item,
                            answer: item.answer.filter((ia: any) => ia !== doc),
                          };
                        } else {
                          return {
                            ...df,
                          };
                        }
                      });
                      setTempFilters([...addedFilters]);
                    }
                  }}
                />
              </Filter>
            );
          })}
          {MultiSelect(item)}
        </>
      );
    }
    return (
      <>
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
      </>
    );
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
          <Desc>We filtered restaurants by your response.</Desc>
          {tempFilters?.map((item, i) => {
            if (item.answer)
              return (
                <FilterContainer key={i}>
                  <div className="label">{item.key}</div>
                  <div className="filters">{returnFiltered(item)}</div>
                </FilterContainer>
              );
          })}
        </ModalBody>

        <ModalFooter>
          <Button
            width="100%"
            colorScheme="purple"
            mb={3}
            onClick={() => saveChanges()}>
            Save
          </Button>
        </ModalFooter>
      </FullModal>
    </FullModalOuter>
  );
};

export default React.memo(FilterModal);

const Filter = styled(Tag)<{ chosen?: boolean }>`
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
  white-space: nowrap;
  flex-wrap: nowrap;
`;

const FilterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};

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

const Desc = styled.div`
  font-size: 14px;
  color: rgba(20, 20, 50, 0.6);
`;

const MultiSelectOptions = styled.div`
  max-height: 200px;
  overflow: scroll;

  .option {
    background: white;
    padding: 5px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;
