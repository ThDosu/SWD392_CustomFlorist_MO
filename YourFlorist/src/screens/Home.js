import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// API giả lập lấy thông tin user & đơn hàng
type User = {
  name: string,
  notifications: number,
  earnings: number,
  ordersToday: number,
};

const fetchUser = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: "Thành Dũng",
          totalOrdersToday: 10,
          completedOrders: 6,
          inProgressOrders: 4,
        }),
      1000
    );
  });
};

export default function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({
    name: "SHIPPER",
    totalOrdersToday: 0,
    completedOrders: 0,
    inProgressOrders: 0,
  });

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  // sau này lấy api để hiển thị đơn hàng
  const orders = [
    {
      id: "1",
      title: "Order #001",
      userImage:
        "https://firebasestorage.googleapis.com/v0/b/swd392-customflorist.firebasestorage.app/o/user_avatar%2Fz6272289540347_8313f84e9f9e88baa3104f321710ad92.jpg?alt=media&token=d60cecfc-f95f-4918-8d87-70cce58733d6",
      userName: "Phạm Lê Thành Dũng",
      status: "Đang giao",
    },
    {
      id: "2",
      title: "Order #002",
      userImage: "https://via.placeholder.com/50",
      userName: "Trần Thị B",
      status: "Chưa giao",
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === "Đang giao");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Logo */}
        <Image source={require("../assets/Logo.png")} style={styles.logo} />

        <TouchableOpacity
          onPress={() => navigation.navigate("NeedHelp")}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 15,
          }}
        >
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {/* Chào user từ API */}
      <Text style={styles.welcomeText}>
        Chào mừng bạn trở lại, {user.name.toUpperCase()}!
      </Text>
      {/* Tổng quan về đơn hàng */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{user.totalOrdersToday}</Text>
          <Text style={styles.statsLabel}>Tổng đơn hôm nay</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{user.completedOrders}</Text>
          <Text style={styles.statsLabel}>Đã giao thành công</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{user.inProgressOrders}</Text>
          <Text style={styles.statsLabel}>Đang giao</Text>
        </View>
      </View>
      {/* Nút Nhận đơn mới */}
      <TouchableOpacity
        style={styles.newOrderButton}
        onPress={() => router.push("/Order")}
      >
        <Text style={styles.newOrderText}>🚀 NHẬN ĐƠN MỚI</Text>
      </TouchableOpacity>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm đơn hàng..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Danh sách đơn hàng */}
      <FlatList
        data={filteredOrders} // ✅ Chỉ hiển thị đơn hàng "Đang giao"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate("OrderDetails", { id: item.id })}
          >
            <View style={styles.orderCard}>
              {/* Ảnh người mua */}
              <Image
                source={{ uri: item.userImage }}
                style={styles.userImage}
              />

              {/* Thông tin đơn hàng */}
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>{item.title}</Text>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.orderStatus}>{item.status}</Text>
              </View>

              {/* Nút hành động */}
              <View style={styles.actionContainer}>
                {item.status === "Chưa giao" ? (
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Nhận giao</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.completeButton}>
                    <Text style={styles.buttonText}>Đã giao</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
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
    color: "#1a1a1a",
  },

  // 📊 Thống kê đơn hàng
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  statsBox: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  statsNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  statsLabel: {
    fontSize: 14,
    color: "#555",
  },

  // 🚀 Nút Nhận đơn mới
  newOrderButton: {
    backgroundColor: "#1fe879",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
  },

  newOrderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  // 🔍 Thanh tìm kiếm lớn hơn
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  searchIcon: {
    marginRight: 10,
  },

  // 📦 Đơn hàng
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },

  orderInfo: {
    flex: 1,
    marginLeft: 15,
  },

  orderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1a1a1a",
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },

  acceptButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  completeButton: {
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  actionContainer: {
    alignSelf: "flex-end",
  },

  orderStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "blue",
  },

  // 🔔 Biểu tượng thông báo có số
  notificationIcon: {
    position: "relative",
    padding: 10,
  },

  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
};
