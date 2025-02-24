import React from "react";
import styled from "styled-components/native";
import { CustomText } from "../../../components/CustomText/CustomText";
import { SharedChairsRow, SharedChairItem } from "./SharedTableStyles.styles";

const CounterContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[2]};
`;

export const CounterSeats = ({ counterSeats }) => {
  return (
    <CounterContainer>
      <CustomText variant="label">Counter</CustomText>
      <SharedChairsRow>
        {counterSeats.map((seat) => {
          const seatData =
            typeof seat === "object" ? seat : { id: seat, status: "empty" };
          return (
            <SharedChairItem
              key={seatData.id}
              status={seatData.status || "empty"}
              style={{ width: 40, height: 40, margin: 4 }}
            >
              <CustomText variant="body">{seatData.id}</CustomText>
            </SharedChairItem>
          );
        })}
      </SharedChairsRow>
    </CounterContainer>
  );
};

export default CounterSeats;
