import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";

// API giả lập lấy thông tin user & đơn hàng
type User = {
    name: string;
    notifications: number;
    earnings: number;
    ordersToday: number;
};

const fetchUser = async (): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name: "Thành Dũng", notifications: 3, earnings: 120, ordersToday: 5 }), 1000);
    });
};

export default function Home() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({ name: "SHIPPER", notifications: 0, earnings: 0, ordersToday: 0 });

    useEffect(() => {
        fetchUser().then(setUser);
    }, []);

    // sau này lấy api để hiển thị đơn hàng
    const orders = [
        { id: "1", image: "https://via.placeholder.com/50", title: "Order #001", rating: 4, time: "10:30 AM", status: "Đang giao" },
        { id: "2", image: "https://via.placeholder.com/50", title: "Order #002", rating: 3, time: "11:00 AM", status: "Chờ lấy hàng" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Logo */}
                <Image source={require("../assets/Logo.png")} style={styles.logo} />

                {/* Biểu tượng trợ giúp với số thông báo */}
                {/* <TouchableOpacity style={styles.notificationIcon} onPress={() => router.push("/NeedHelp")}>
          <Ionicons name="help-circle-outline" size={28} color="black" />
          {user.notifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{user.notifications}</Text>
            </View>
          )}
        </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("NeedHelp")}
                    style={{
                        paddingHorizontal: 14,
                        paddingVertical: 15,
                    }}
                >
                    <Ionicons name="help-circle-outline" size={28} color="black" />
                    {user.notifications > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>{user.notifications}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Chào user từ API */}
            <Text style={styles.welcomeText}>Chào mừng bạn trở lại, {user.name.toUpperCase()}!</Text>

            {/* Tổng quan về đơn hàng & thu nhập */}
            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={styles.statsNumber}>{user.ordersToday}</Text>
                    <Text style={styles.statsLabel}>Đơn hôm nay</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={styles.statsNumber}>${user.earnings}</Text>
                    <Text style={styles.statsLabel}>Thu nhập hôm nay</Text>
                </View>
            </View>

            {/* Nút Nhận đơn mới */}
            <TouchableOpacity style={styles.newOrderButton} onPress={() => router.push("/NewOrders")}>
                <Text style={styles.newOrderText}>🚀 NHẬN ĐƠN MỚI</Text>
            </TouchableOpacity>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={22} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm đơn hàng..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Danh sách đơn hàng */}
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderCard} onPress={() => router.push(`/OrderDetails/${item.id}`)}>
                        <Image source={{ uri: item.image }} style={styles.orderImage} />
                        <View style={styles.orderInfo}>
                            <Text style={styles.orderTitle}>{item.title}</Text>
                            <Text>{"⭐".repeat(item.rating) + "☆".repeat(5 - item.rating)}</Text>
                            <Text style={styles.orderTime}>{item.time} - {item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

// Styles
const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginLeft: 0,
    },

    welcomeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#1a1a1a"
    },

    // 📊 Thống kê đơn hàng & thu nhập
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },

    statsBox: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5
    },
    statsNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333"
    },

    statsLabel: {
        fontSize: 14,
        color: "#555"
    },

    // 🚀 Nút Nhận đơn mới
    newOrderButton: { backgroundColor: "#1fe879", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginVertical: 15 },
    newOrderText: { color: "white", fontWeight: "bold", fontSize: 18 },

    // 🔍 Thanh tìm kiếm lớn hơn
    searchContainer: { flexDirection: "row", backgroundColor: "#f0f0f0", borderRadius: 10, alignItems: "center", paddingHorizontal: 15, height: 50 },
    searchInput: { flex: 1, fontSize: 16 },
    searchIcon: { marginRight: 10 },

    // 📦 Đơn hàng
    orderCard: { flexDirection: "row", backgroundColor: "#f8f8f8", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 5 },
    orderImage: { width: 55, height: 55, borderRadius: 10 },
    orderInfo: { marginLeft: 15 },
    orderTitle: { fontWeight: "bold", fontSize: 16, color: "#1a1a1a" },

    // 🔔 Biểu tượng thông báo có số
    notificationIcon: { position: "relative", padding: 10 },
    notificationBadge: { position: "absolute", top: 5, right: 5, backgroundColor: "red", width: 18, height: 18, borderRadius: 9, justifyContent: "center", alignItems: "center" },
    notificationText: { color: "white", fontSize: 12, fontWeight: "bold" },
};
