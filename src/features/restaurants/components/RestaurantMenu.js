import React from "react";
import { View, Text } from "react-native";
import { List, Divider } from "react-native-paper";

const RestaurantMenu = () => (
  <View>
    <Text style={{ fontSize: 24, margin: 16 }}>Menu</Text>
    <List.Accordion
      title="Menu"
      left={(props) => <List.Icon {...props} icon="bread-slice" />}
    >
      {Array.from({ length: 30 }, (_, index) => (
        <List.Item key={index} title={`Item ${index + 1}`} />
      ))}
    </List.Accordion>
    <Divider />
  </View>
);

export default RestaurantMenu;
