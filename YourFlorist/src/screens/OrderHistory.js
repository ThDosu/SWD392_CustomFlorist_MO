import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, OrderHistoryCategory } from "../components";
import { COLORS, FONTS, SAFEAREAVIEW, history, SIZES } from "../constants";

export default function OrderHistory() {
    const [category, setCategory] = useState("upcoming");
    const navigation = useNavigation();

    function renderCategory() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: SIZES.paddingTop_01,
                    marginBottom: 30,
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: "48%",
                        backgroundColor:
                            category == "upcoming"
                                ? COLORS.green
                                : COLORS.lightGreen,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                    }}
                    onPress={() => setCategory("upcoming")}
                >
                    <Text
                        style={{
                            ...FONTS.Roboto_700Bold,
                            fontSize: 16,
                            color:
                                category == "upcoming"
                                    ? COLORS.white
                                    : COLORS.green,
                        }}
                    >
                        Upcoming
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: "48%",
                        backgroundColor:
                            category == "history"
                                ? COLORS.yellow
                                : COLORS.lightYellow,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                    }}
                    onPress={() => setCategory("history")}
                >
                    <Text
                        style={{
                            ...FONTS.Roboto_700Bold,
                            fontSize: 16,
                            color:
                                category == "history"
                                    ? COLORS.white
                                    : COLORS.yellow,
                        }}
                    >
                        History
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderUpcoming() {
        return history.map((item, index) => {
            return (
                item.upcoming === true && (
                    <View key={index}>
                        <OrderHistoryCategory item={item} type={"upcoming"} />
                    </View>
                )
            );
        });
    }

    function renderHistory() {
        return history.map((item, index) => {
            return (
                item.completed === true && (
                    <View key={index}>
                        <OrderHistoryCategory item={item} type={"completed"} />
                    </View>
                )
            );
        });
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Order History" onPress={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderCategory()}
                {category === "upcoming" ? renderUpcoming() : renderHistory()}
            </ScrollView>
        </SafeAreaView>
    );
}
