import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Guide1 from "./guides/Guide1";
import Guide2 from "./guides/Guide2";
import Guide3 from "./guides/Guide3"; 

const guides = {
  "1": Guide1,
  "2": Guide2,
  "3": Guide3,
};

export default function GuideDetail() {
  const route = useRoute();
  const { id } = route.params;

  const GuideComponent = guides[id];

  if (!GuideComponent) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, color: "red" }}>Hướng dẫn không tồn tại!</Text>
      </View>
    );
  }

  return <GuideComponent />;
}
