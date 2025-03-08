// src/features/merchant/reservations/components/CounterSeatHeader.js
import React from "react";
import { SharedChairItem } from "../../dashboard/components/SharedTableStyles.styles";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { TableColumn } from "./MerchantReservation.styles";
import styled from "styled-components/native";

// Define the styled component here instead of using the imported one
const CounterSeatHeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const CounterSeatTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const ChairItem = styled(SharedChairItem)`
  width: 22px;
  height: 22px;
  margin: 2px;
  justify-content: center;
  align-items: center;
`;

const CounterSeatHeader = ({
  seat,
  isExpanded,
  toggleExpandSeat,
  width = 60, // Default width parameter
}) => {
  const seatData =
    typeof seat === "object" ? seat : { id: seat, status: "empty" };

  return (
    <TableColumn style={{ width }}>
      <CounterSeatHeaderContainer>
        <CounterSeatTitle></CounterSeatTitle>
        <ChairItem
          status={seatData.status || "empty"}
          onPress={() => toggleExpandSeat && toggleExpandSeat(seatData.id)}
        >
          <CustomText
            variant="caption"
            style={{ fontSize: 10, fontWeight: "bold" }}
          >
            {seatData.id}
          </CustomText>
        </ChairItem>
      </CounterSeatHeaderContainer>
    </TableColumn>
  );
};

export default CounterSeatHeader;
