import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export default function Order() {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Lưu userId từ context hoặc state
  const [courierId, setCourierId] = useState(null); // Lưu courierId từ context hoặc state
  const [deliveryId, setDeliveryId] = useState(null); // Lưu deliveryId từ context hoặc state

  // decode authToken từ token
  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        setCourierId(decodedUser.UserID);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [authToken]);

  const fetchOrders = async () => {
    try {
      const today = new Date();
      const minOrderDate = new Date(today.setDate(today.getDate() - 30))
        .toISOString()
        .split(".")[0];
      const maxOrderDate = new Date().toISOString().split(".")[0];
      const url = `https://custom-florist.onrender.com/custom-florist/api/v1/orders/active/courier?minOrderDate=${minOrderDate}&maxOrderDate=${maxOrderDate}&status=SHIPPED&page=0&size=50&direction=ASC`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setOrders(response.data.data.content);
      setUserId(response.data.data.content.userId); // Lưu userId từ phản hồi
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchOrders trong useEffect
  useEffect(() => {
    if (authToken) {
      fetchOrders();
    }
  }, [authToken]);

  const handleOrderPress = (orderId) => {
    navigation.navigate("OrderDetails", { orderId });
  };

  const filteredOrders = orders.filter(
    (item) =>
      item.orderId.toString().includes(search) ||
      item.userName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAcceptDelivery = async (orderId, userId) => {
    try {
      const currentHour = new Date().getHours();
      const note =
        currentHour < 12 ? "Deliver in the morning" : "Deliver in the evening";
      const deliveryDate = new Date().toISOString().slice(0, 19);

      const response = await fetch(
        "https://custom-florist.onrender.com/custom-florist/api/v1/delivery-histories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            userId,
            courierId,
            orderId,
            deliveryDate,
            status: "SHIPPED",
            note,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi nhận đơn hàng!");
      }

      Alert.alert("Thành công", "Bạn đã nhận đơn hàng!", [
        { text: "OK", onPress: () => fetchOrders() }, // Gọi lại danh sách đơn hàng
      ]);
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  const handleUpdateDeliveryStatus = async (deliveryId, status) => {
    const deliveryDate = new Date().toISOString().slice(0, 19);
    try {
      const response = await fetch(
        `https://custom-florist.onrender.com/custom-florist/api/v1/delivery-histories/${deliveryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            deliveryDate,
            status,
            note: "",
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Lỗi cập nhật trạng thái!");
      }

      Alert.alert("Thành công", `Đơn hàng đã được cập nhật: ${status}`, [
        { text: "OK", onPress: () => fetchOrders() },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => handleOrderPress(item.orderId)}
    >
      <View style={styles.orderInfo}>
        <Text style={styles.orderTitle}>Mã đơn: {item.orderId}</Text>
        <Text style={styles.userName}>Khách hàng: {item.userName}</Text>
        <Text style={styles.orderStatus}>Địa chỉ: {item.shippingAddress}</Text>
        <Text style={styles.orderStatus}>Số điện thoại: {item.phone}</Text>
      </View>
      {item.deliveryHistories.length === 0 ? (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptDelivery(item.orderId, item.userId)}
        >
          <Text style={styles.buttonText}>Nhận giao</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() =>
              handleUpdateDeliveryStatus(
                item.deliveryHistories[0].deliveryId,
                "DELIVERED"
              )
            }
          >
            <Text style={styles.buttonText}>Hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              handleUpdateDeliveryStatus(
                item.deliveryHistories[0].deliveryId,
                "CANCELLED"
              )
            }
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate("NeedHelp")}
          style={{ paddingHorizontal: 14, paddingVertical: 15 }}
        >
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>DANH SÁCH ĐƠN HÀNG</Text>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderOrderItem}
        />
      )}
    </View>
  );
}

const styles = {
  container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  logo: { width: 200, height: 100, resizeMode: "contain" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#1a1a1a",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 16 },
  searchIcon: { marginRight: 10 },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderInfo: { marginLeft: 15, flex: 1 },
  orderTitle: { fontWeight: "bold", fontSize: 16, color: "#1a1a1a" },
  userName: { fontSize: 14, color: "#555" },
  orderStatus: { fontSize: 14, fontWeight: "bold", marginVertical: 5 },
  acceptButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "bold" },
};
