import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";
import { getUserById } from "../constants/demo_data";

export default function ProfileDetail() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Giả sử userId được lấy từ props hoặc state
        const userId = "11"; // Ví dụ lấy user có ID 11
        const data = getUserById(userId);
        setUser(data);
    }, []);

    if (!user) {
        return (
            <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={COLORS.green} />
            </SafeAreaView>
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    paddingVertical: SIZES.paddingVertical,
                    alignItems: "center",
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Ảnh đại diện */}
                <View style={{ width: "100%", alignItems: "center", marginBottom: 30 }}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            marginBottom: 10
                        }}
                    />
                    <Text style={{ ...FONTS.Roboto_700Bold, fontSize: 18, color: COLORS.black }}>
                        {user.name}
                    </Text>
                </View>

                {/* Thông tin người dùng */}
                <InfoItem title="Full Name" value={user.name} />
                <InfoItem title="Telephone Number" value={user.phone} />
                <InfoItem title="Email" value={user.email} />
                <InfoItem title="Address" value={user.address} />
                <InfoItem title="Gender" value={user.gender} />
                <InfoItem title="Date of Birth" value={user.dateOfBirth} />

                {/* Nút chỉnh sửa */}
                <Button
                    title="Edit Profile"
                    containerStyle={{
                        backgroundColor: COLORS.green,
                        marginBottom: 20,
                    }}
                    onPress={() => navigation.navigate("EditProfile")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Profile Details" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}   

/**
 * Component hiển thị thông tin từng mục
 */
const InfoItem = ({ title, value }) => (
    <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={{ ...FONTS.Roboto_700Bold, fontSize: 18, color: COLORS.black }}>
            {title}
        </Text>
        <Text style={{ ...FONTS.Roboto_400Regular, fontSize: 16, color: COLORS.gray }}>
            {value}
        </Text>
    </View>
);

