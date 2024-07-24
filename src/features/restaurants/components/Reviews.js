import React from "react";
import { View, Text } from "react-native";
import { List, Divider } from "react-native-paper";

const Reviews = () => (
  <View>
    <Text style={{ fontSize: 24, margin: 16 }}>Reviews</Text>
    <List.Accordion
      title="Reviews"
      left={(props) => <List.Icon {...props} icon="star" />}
    >
      {Array.from({ length: 50 }, (_, index) => (
        <List.Item key={index} title={`Review ${index + 1}`} />
      ))}
    </List.Accordion>
    <Divider />
  </View>
);

export default Reviews;