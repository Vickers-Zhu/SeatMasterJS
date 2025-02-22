// File: src/features/merchant/components/SeatView.js
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../components/CustomText/CustomText";
import {
  SharedTableItem,
  SharedChairItem,
  SharedChairsRow,
  VerticalSeparator as DefaultVerticalSeparator,
} from "./SharedTableStyles.styles";

// Container for each row (table and its chairs)
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

// Left column: table item with fixed dimensions
const TableColumn = styled.View`
  width: 60px;
  align-items: center;
`;

// Right column: chairs for that table
const ChairsColumn = styled.View`
  flex: 1;
  padding-left: ${({ theme }) => theme.space[2]};
`;

// Vertical separator with fixed height (matching table height)
const VerticalSeparator = styled(DefaultVerticalSeparator)`
  height: 60px;
`;

// Container for the counter seats section
const CounterContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[2]};
`;

export const SeatView = ({ seatingData, tableStatuses }) => {
  return (
    <ScrollView>
      {/* Counter Seats Section at the very beginning */}
      {seatingData.counterSeats && seatingData.counterSeats.length > 0 && (
        <CounterContainer>
          <CustomText variant="label">Counter</CustomText>
          <SharedChairsRow>
            {seatingData.counterSeats.map((seat) => (
              <SharedChairItem
                key={seat.id}
                style={{ width: 40, height: 40, margin: 4 }}
              >
                <CustomText variant="body">{seat.id}</CustomText>
              </SharedChairItem>
            ))}
          </SharedChairsRow>
        </CounterContainer>
      )}

      {/* Render each table and its corresponding chairs */}
      {seatingData.tables.map((table) => {
        // Find the status object whose 'id' matches the table.id
        const tableStatus = Object.values(tableStatuses || {}).find(
          (statusObj) => statusObj.id === table.id
        );

        return (
          <RowContainer key={table.id}>
            <TableColumn>
              <SharedTableItem
                status={tableStatus ? tableStatus.status : "empty"}
                style={{ width: 60, height: 60 }}
              >
                <CustomText variant="label">{table.id}</CustomText>
              </SharedTableItem>
            </TableColumn>
            <VerticalSeparator />
            <ChairsColumn>
              <SharedChairsRow>
                {table.chairs.map((chair) => (
                  <SharedChairItem
                    key={chair.id}
                    style={{ width: 40, height: 40, margin: 4 }}
                  >
                    <CustomText variant="body">{chair.id}</CustomText>
                  </SharedChairItem>
                ))}
              </SharedChairsRow>
            </ChairsColumn>
          </RowContainer>
        );
      })}
    </ScrollView>
  );
};
