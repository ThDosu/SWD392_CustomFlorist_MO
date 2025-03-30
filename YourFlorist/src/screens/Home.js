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
import { useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";

export default function Home({ setSelectedTab }) {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "Shipper" });
  const [courierId, setCourierId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);

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
    setLoading(true);
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

      // Lọc chỉ những đơn hàng có deliveryHistories không rỗng
      const filteredOrders = response.data.data.content.filter(
        (order) => order.deliveryHistories.length > 0
      );

      // console.log("Filtered Orders:", JSON.stringify(filteredOrders, null, 2));

      setOrders(filteredOrders);
      setFilteredOrders(filteredOrders);

      if (filteredOrders.length > 0) {
        setUserId(filteredOrders[0].userId);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchOrders();
    }
  }, [authToken]);

  // const handleOrderPress = (orderId) => {
  //   navigation.navigate("OrderDetails", { orderId });
  // };

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredOrders(
      text.trim() === ""
        ? orders
        : orders.filter((item) =>
            [item.deliveryCode, item.orderId, item.customerName]
              .map((field) => field?.toString().toLowerCase() || "")
              .some((field) => field.includes(text.toLowerCase()))
          )
    );
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

  const handleAcceptDelivery = async (orderId, userId) => {
    try {
      const response = await axios.post(
        "https://custom-florist.onrender.com/custom-florist/api/v1/delivery-histories",
        {
          orderId,
          userId,
          courierId,
          status: "IN_PROGRESS",
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.status === 201) {
        Alert.alert("Thành công", "Bạn đã nhận đơn hàng này.");
        fetchOrders();
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể nhận đơn hàng.");
    }
  };

  // const renderOrderItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.orderCard}
  //     onPress={() => handleOrderPress(item.orderId)}
  //   >
  //     <View style={styles.orderInfo}>
  //       <Text style={styles.orderTitle}>Mã đơn: {item.orderId}</Text>
  //       <Text style={styles.userName}>Khách hàng: {item.userName}</Text>
  //       <Text style={styles.orderStatus}>Địa chỉ: {item.shippingAddress}</Text>
  //       <Text style={styles.orderStatus}>Số điện thoại: {item.phone}</Text>
  //     </View>
  //     {item.deliveryHistories.length === 0 ? (
  //       // <TouchableOpacity
  //       //   style={styles.acceptButton}
  //       //   onPress={() => handleAcceptDelivery(item.orderId, item.userId)}
  //       // >
  //       <View style={styles.orderCard}>
  //         <Text style={styles.buttonText}>Nhận giao</Text>
  //       </TouchableOpacity>
  //     ) : (
  //       <View>
  //         <TouchableOpacity
  //           style={styles.completeButton}
  //           onPress={() =>
  //             handleUpdateDeliveryStatus(
  //               item.deliveryHistories[0].deliveryId,
  //               "DELIVERED"
  //             )
  //           }
  //         >
  //           <Text style={styles.buttonText}>Hoàn thành</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.cancelButton}
  //           onPress={() =>
  //             handleUpdateDeliveryStatus(
  //               item.deliveryHistories[0].deliveryId,
  //               "CANCELLED"
  //             )
  //           }
  //         >
  //           <Text style={styles.buttonText}>Hủy</Text>
  //         </TouchableOpacity>
  //         </View>
  //       </View>
  //     )}
  //   </TouchableOpacity>
  // );
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
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
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.helpIcon}>
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>
        Chào mừng bạn trở lại, {user.name.toUpperCase()}!
      </Text>
      <TouchableOpacity
        style={styles.newOrderButton}
        onPress={() => setSelectedTab("Order")}
      >
        <Text style={styles.newOrderText}>🚀 NHẬN ĐƠN MỚI</Text>
      </TouchableOpacity>
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
          onChangeText={handleSearch}
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  logo: { width: 200, height: 100, resizeMode: "contain" },
  helpIcon: { paddingHorizontal: 14, paddingVertical: 15 },
  welcomeText: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  newOrderButton: {
    backgroundColor: "#1fe879",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
  },
  newOrderText: { color: "white", fontWeight: "bold", fontSize: 18 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1 },
  loader: { marginTop: 20 },
  orderInfo: { marginLeft: 15, flex: 1 },
  orderTitle: { fontWeight: "bold", fontSize: 16, color: "#1a1a1a" },
  userName: { fontSize: 14, color: "#555" },
  orderStatus: { fontSize: 14, fontWeight: "bold", marginVertical: 5 },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderText: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  completeButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
