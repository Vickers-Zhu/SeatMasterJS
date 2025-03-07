// src/features/merchant/reservations/components/TableHeader.js
import React from "react";
import { SharedTableItem } from "../../dashboard/components/SharedTableStyles.styles";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { getChairRows } from "../utils/reservationUtils";
import {
  TableColumn,
  TableItem,
  ChairsGrid,
  ChairRow,
  ChairItem,
  ShowMoreButton,
  ButtonText,
} from "./MerchantReservation.styles";

const TableHeader = ({
  table,
  tableStatus,
  expandedTableIds,
  toggleExpandTable,
}) => {
  const isExpanded = expandedTableIds.has(table.id);
  const chairRows = getChairRows(table.chairs, 2);
  const rowsToDisplay = isExpanded ? chairRows : chairRows.slice(0, 1);

  return (
    <TableColumn key={table.id}>
      <TableItem>
        <SharedTableItem
          status={tableStatus || "empty"}
          style={{ width: 60, height: 40 }}
        >
          <CustomText variant="caption">Table {table.id}</CustomText>
        </SharedTableItem>

        <ChairsGrid>
          {rowsToDisplay.map((row, rowIndex) => (
            <ChairRow key={`row-${rowIndex}`}>
              {row.map((chair) => {
                const chairData =
                  typeof chair === "object"
                    ? chair
                    : { id: chair, status: "empty" };
                return (
                  <ChairItem key={chairData.id} status={chairData.status}>
                    <CustomText
                      variant="caption"
                      style={{ fontSize: 10, fontWeight: "bold" }}
                    >
                      {chairData.id.toString().slice(-1)}
                    </CustomText>
                  </ChairItem>
                );
              })}
            </ChairRow>
          ))}
        </ChairsGrid>

        {table.chairs.length > 2 && (
          <ShowMoreButton onPress={() => toggleExpandTable(table.id)}>
            <ButtonText>
              {isExpanded ? "Hide" : `+${table.chairs.length - 2}`}
            </ButtonText>
          </ShowMoreButton>
        )}
      </TableItem>
    </TableColumn>
  );
};

export default TableHeader;
