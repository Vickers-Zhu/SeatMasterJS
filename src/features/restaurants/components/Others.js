import React from "react";
import { View, Text } from "react-native";
import { List, Divider } from "react-native-paper";

const Others = () => (
  <View>
    <Text style={{ fontSize: 24, margin: 16 }}>Others</Text>
    <List.Accordion
      title="Others"
      left={(props) => <List.Icon {...props} icon="dots-horizontal" />}
    >
      {Array.from({ length: 50 }, (_, index) => (
        <List.Item key={index} title={`Other ${index + 1}`} />
      ))}
    </List.Accordion>
    <Divider />
  </View>
);

export default Others;