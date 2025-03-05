// import { useRoute } from "@react-navigation/native";

// export default function GuideDetail() {
//     const route = useRoute();
//     const { id } = route.params;

//     // let Component;
//     // try {
//     //     Component = require(`./guides/Guide${id}.js`).default;
//     // } catch (error) {
//     //     return <Text style={{ padding: 20, fontSize: 18 }}>Hướng dẫn không tồn tại!</Text>;
//     // }

//     // return <Component />;
// }
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

// Import tất cả các file hướng dẫn tĩnh
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
