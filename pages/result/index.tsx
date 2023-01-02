import { Button, Select } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
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
import { useChatStore } from "../../utils/store";
import { CalendarIcon, CloseIcon } from "@chakra-ui/icons";
import NumInput from "../../components/NumInput";
import FilterModal from "./FilterModal";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const RESTS = [
  {
    name: "Tempo",
    url: "https://www.yelp.com/biz/poesia-san-francisco?osq=restaurants",
    category: ["Italian", "Bars"],
    overall_star: 3.9827378564641682,
    location: "4072 18th St",
  },
  {
    name: "Tempo",
    url: "https://www.yelp.com/biz/poesia-san-francisco?osq=restaurants",
    category: ["Italian", "Bars"],
    overall_star: 3.9827378564641682,
    location: "4072 18th St",
  },
  {
    name: "Tempo",
    url: "https://www.yelp.com/biz/poesia-san-francisco?osq=restaurants",
    category: ["Italian", "Bars"],
    overall_star: 3.9827378564641682,
    location: "4072 18th St",
  },
];

const ResultPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const {
    settingDate,
    setDate,
    filtered,
    setFiltered,
    time,
    setTime,
    people,
    setPeople,
  } = useChatStore();

  const openDateChange = () => {
    setIsDateOpen(true);
  };

  const returnDate = () => {
    return (
      <div className="date">
        Today({DAYS[settingDate.getDay()]} {MONTHS[settingDate.getMonth()]}{" "}
        {settingDate.getDate()}) / 2 people
      </div>
    );
  };

  console.log("필터들", filtered);

  return (
    <ResultContainer>
      <Column>
        <div className="title">Results</div>
      </Column>
      <Column onClick={() => openDateChange()}>
        <CalendarIcon />
        {returnDate()}
      </Column>
      <Column
        onClick={() => {
          setIsFilterOpen((prev) => !prev);
        }}>
        Filters
        {filtered.map((item, index) => {
          if (item.answer)
            return <FilterDefault key={index}>{item.key}</FilterDefault>;
        })}
      </Column>
      <RestaurantsContainer>
        <div>Click to move to yelp</div>
        <div>
          {RESTS.map((item, index) => {
            return (
              <Restaurant
                key={index}
                onClick={() => {
                  window.open(item.url);
                }}>
                <div>{item.name}</div>
              </Restaurant>
            );
          })}
        </div>
      </RestaurantsContainer>

      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <FullModalOuter
        isOpen={isDateOpen}
        onClose={() => setIsDateOpen(false)}
        motionPreset="slideInBottom">
        <ModalOverlay />
        <FullModal>
          <ModalHeader>Modify Date and Nums</ModalHeader>
          <CloseButton onClick={() => setIsDateOpen(false)}>
            <CloseIcon />
          </CloseButton>
          <ModalBody>
            <Label>When will you go?</Label>
            {/* 시간 물어보고, 날짜 물어보고 */}
            <TimeContainer>
              <div className="today">Today</div>
              <Select ml={3} maxWidth={220} value={time}>
                <option value="0030">00:30</option>
                <option value="0100">01:00</option>
              </Select>
            </TimeContainer>
            <Label>The number of people</Label>
            <NumInput value={people} onChange={setPeople} />
          </ModalBody>

          <ModalFooter>
            <Button
              width="100%"
              colorScheme="purple"
              onClick={() => setIsDateOpen(false)}>
              Save
            </Button>
          </ModalFooter>
        </FullModal>
      </FullModalOuter>
    </ResultContainer>
  );
};

export default ResultPage;

const RestaurantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: start;
  background-color: ${({ theme }) => theme.grey};
  width: 100%;
  min-height: 80vh;
  padding: 5px;
`;

const Restaurant = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px 5px;
  border-radius: 3px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
`;

export const FilterDefault = styled.button`
  border-radius: 30px;
  padding: 4px 16px;
  display: flex;
  background-color: ${({ theme }) => theme.purple02};
  border: 1px solid ${({ theme }) => theme.borderColor01};
  margin-right: 5px;
`;

const Label = styled.div`
  font-size: 16px;
  margin: 20px 0px;
  font-weight: 600;
`;

const Column = styled.div`
  overflow: scroll;
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  width: 100%;
  color: ${({ theme }) => theme.textColor02};
  background: ${({ theme }) => theme.grey};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  cursor: pointer;

  .title {
    font-weight: 600;
  }
  .date {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  font-family: Pretendard;
`;

export const FullModal = styled(ModalContent)`
  min-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  border-radius: 0px;
  top: 0px;
  margin: 0px;
`;

export const FullModalOuter = styled(Modal)`
  padding: 0px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  padding: 10px 20px;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .today {
    font-weight: 600;
    color: ${({ theme }) => theme.purple03};
  }
`;
