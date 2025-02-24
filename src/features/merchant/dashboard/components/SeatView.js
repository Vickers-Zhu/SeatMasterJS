import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { Separator } from "../../../../components/Separator/Separator";
import {
  SharedTableItem,
  SharedChairItem,
  SharedChairsRow,
  VerticalSeparator as DefaultVerticalSeparator,
} from "./SharedTableStyles.styles";
import CounterSeats from "./CounterSeats";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const TableColumn = styled.View`
  width: 60px;
  align-items: center;
`;

const ChairsColumn = styled.View`
  flex: 1;
  padding-left: ${({ theme }) => theme.space[2]};
`;

const VerticalSeparator = styled(DefaultVerticalSeparator)`
  height: 60px;
`;

export const SeatView = ({ seatingData, tableStatuses }) => {
  return (
    <ScrollView>
      <CounterSeats counterSeats={seatingData.counterSeats} />
      <Separator type="full" />
      {seatingData.tables.map((table) => {
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
                {table.chairs.map((chair) => {
                  const chairData =
                    typeof chair === "object"
                      ? chair
                      : { id: chair, status: "empty" };
                  return (
                    <SharedChairItem
                      key={chairData.id}
                      status={chairData.status || "empty"}
                      style={{ width: 40, height: 40, margin: 4 }}
                    >
                      <CustomText variant="body">{chairData.id}</CustomText>
                    </SharedChairItem>
                  );
                })}
              </SharedChairsRow>
            </ChairsColumn>
          </RowContainer>
        );
      })}
    </ScrollView>
  );
};
