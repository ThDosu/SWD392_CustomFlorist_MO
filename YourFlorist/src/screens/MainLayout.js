import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { tabs, COLORS, FONTS } from "../constants";

import HomeOne from "./Home";
import Order from "./Order";
import OrderHistory from "./OrderHistory";
import Profile from "../screens/Profile";

export default function MainLayout() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("Home");

    return (
        <View style={{ flex: 1 }}>
            {selectedTab == "Home" && <HomeOne />}
            {selectedTab == "Order" && <Order />}
            {selectedTab == "OrderHistory" && <OrderHistory />}
            {selectedTab == "Profile" && <Profile />}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 28,
                    paddingVertical: 16,
                    backgroundColor: COLORS.white,
                    borderTopColor: COLORS.lightGray,
                    borderTopWidth: 1,
                }}
            >
                {tabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSelectedTab(item.screen);
                            }}  
                        >
                            <Image
                                source={item.icon}
                                style={{
                                    height: 24,
                                    width: "100%",
                                    tintColor:
                                        selectedTab == item.screen
                                            ? COLORS.green
                                            : COLORS.gray2,
                                    marginBottom: 10,
                                }}
                                resizeMode="contain"
                            />
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 14,
                                    lineHeight: 14 * 1,
                                    color:
                                        selectedTab == item.screen
                                            ? COLORS.green
                                            : COLORS.gray2,
                                }}
                            >
                                {item.screen}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
