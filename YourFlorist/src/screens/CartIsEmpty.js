import { View, Text, ScrollView } from "react-native";
import React from "react";

import { Empty, Button } from "../components";
import { COLORS, FONTS } from "../constants";

function renderContent() {
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 30,
                backgroundColor: COLORS.white,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ marginBottom: 52 }}>
                <Empty />
            </View>
            <Text
                style={{
                    ...FONTS.Roboto_700Bold,
                    fontSize: 20,
                    color: COLORS.green,
                    textTransform: "capitalize",
                    marginBottom: 5,
                }}
            >
                Your Cart is empty
            </Text>
            <Text
                style={{
                    ...FONTS.Roboto_400Regular,
                    fontSize: 14,
                    marginBottom: 26,
                    color: COLORS.gray2,
                }}
            >
                Looks like you haven't made your order yet.
            </Text>
            <Button
                containerStyle={{ backgroundColor: COLORS.green }}
                title="Shop now"
            />
        </ScrollView>
    );
}

export default function CartIsEmpty() {
    return <View style={{ flex: 1 }}>{renderContent()}</View>;
}
