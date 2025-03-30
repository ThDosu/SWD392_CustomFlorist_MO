import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./context/AuthContext";
import "core-js/stable/atob";

export default function OrderHistory() {
  const navigation = useNavigation();
  const { authToken } = useAuth();

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("DELIVERED");
  const [user, setUser] = useState({ name: "Khách hàng" }); // Thêm khai báo state cho user

  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        setUser({ name: decodedUser.FullName || "Shipper" });
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [authToken]);

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const fetchOrders = async () => {
    if (!authToken) return;
    try {
      setLoading(true);
      const decodedUser = jwtDecode(authToken);
      const userID = decodedUser.UserID;

      const apiUrl = `https://custom-florist.onrender.com/custom-florist/api/v1/delivery-histories/active/courier/${userID}?status=${selectedStatus}&page=0&size=50&direction=ASC`;

      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await response.json();
      if (response.ok && data.data && data.data.content) {
        // console.log("Data:", JSON.stringify(data.data.content, null, 2));
        const ordersWithNames = await Promise.all(
          data.data.content.map(async (order) => {
            const customerName = await fetchUserName(order.userId);
            const deliveryDate = extractDeliveryDate(order.statusHistories);
            return { ...order, customerName, deliveryDate };
          })
        );
        setOrders(ordersWithNames);
        setFilteredOrders(ordersWithNames);
      } else {
        console.error("Lỗi lấy đơn hàng:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy tên khách hàng từ API
  const fetchUserName = async (userId) => {
    if (!authToken) return "Khách hàng";
    try {
      const response = await fetch(
        `https://custom-florist.onrender.com/custom-florist/api/v1/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data.data.name || "Khách hàng";
      } else {
        console.error("Lỗi lấy thông tin user:", data);
        return "Khách hàng";
      }
    } catch (error) {
      console.error("Lỗi kết nối API user:", error);
      return "Khách hàng";
    }
  };

  // Hàm lấy ngày giao hàng từ statusHistories
  const extractDeliveryDate = (statusHistories) => {
    if (!statusHistories || statusHistories.length === 0) return "Chưa có";

    // Lấy trạng thái cuối cùng có `changedAt`
    const lastStatus = statusHistories[statusHistories.length - 1];

    if (lastStatus.changedAt && lastStatus.changedAt.length >= 6) {
      const [year, month, day, hour, minute, second] = lastStatus.changedAt;

      // Định dạng phút & giây với số 0 đằng trước nếu nhỏ hơn 10
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      const formattedSecond = second < 10 ? `0${second}` : second;

      return `${day}/${month}/${year} ${hour}:${formattedMinute}:${formattedSecond}`;
    }

    return "Chưa có";
  };

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [search, orders]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate("NeedHelp")}
          style={{ paddingHorizontal: 14, paddingVertical: 15 }}
        >
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>LỊCH SỬ ĐƠN HÀNG</Text>

      {/* Ô tìm kiếm */}
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

      {/* Nút chuyển đổi trạng thái */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            selectedStatus === "DELIVERED" && styles.activeStatus,
          ]}
          onPress={() => setSelectedStatus("DELIVERED")}
        >
          <Text style={styles.statusText}>Đã giao</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            selectedStatus === "CANCELLED" && styles.activeStatus,
          ]}
          onPress={() => setSelectedStatus("CANCELLED")}
        >
          <Text style={styles.statusText}>Đã hủy</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách đơn hàng */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>Mã: {item.deliveryCode}</Text>
                <Text style={styles.userName}>Khách: {item.customerName}</Text>
                <Text style={styles.deliveryDate}>
                  Ngày hoàn thành: {item.deliveryDate || "Chưa có"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#1a1a1a",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Căn sát trái
    marginBottom: 10,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10, // Cách nhau một chút
    backgroundColor: "#e0e0e0",
  },
  activeStatus: {
    backgroundColor: "#4CAF50",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderInfo: {
    marginLeft: 15,
    flex: 1,
  },
  orderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1a1a1a",
  },
  userName: {
    fontSize: 14,
    color: "#555",
  },
  deliveryDate: {
    fontSize: 14,
    color: "#888",
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
};
