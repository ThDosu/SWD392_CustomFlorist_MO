import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { orderDetails } from "../constants/demo_data";

export default function OrderDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Nhận ID đơn hàng từ màn hình trước
  const order = orderDetails[id];

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy đơn hàng!</Text>
      </View>
    );
  }

  const handleCompleteOrder = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn hoàn tất giao hàng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          Alert.alert("Thành công", "Đơn hàng đã được đánh dấu là hoàn tất!");
          navigation.goBack(); // Quay lại trang trước
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi Tiết Đơn Hàng</Text>
      </View>

      {/* Thông tin khách hàng */}
      <View style={styles.customerContainer}>
        <Image
          source={{ uri: order.customer.image }}
          style={styles.customerImage}
        />
        <View>
          <Text style={styles.customerName}>{order.customer.name}</Text>
          <Text style={styles.customerInfo}>📞 {order.customer.phone}</Text>
          <Text style={styles.customerInfo}>✉️ {order.customer.email}</Text>
          <Text style={styles.customerInfo}>📍 {order.customer.address}</Text>
        </View>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={order.products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productId}>Mã SP: {item.productId}</Text>
            <Text style={styles.productText}>
              🌸 Loại hoa: {item.flowers.join(", ")}
            </Text>
            <Text style={styles.productText}>
              💰 Giá hoa: {item.unitPrice.toLocaleString()}đ
            </Text>
            <Text style={styles.productText}>
              🎀 Giá bó hoa: {item.bouquetPrice.toLocaleString()}đ
            </Text>
            <Text style={styles.productTotal}>
              🛒 Giá tổng: {item.totalFlowerPrice.toLocaleString()}đ
            </Text>
            <Text style={styles.finalPrice}>
              💵 Giá cuối: {item.finalPrice.toLocaleString()}đ
            </Text>
          </View>
        )}
      />

      {/* Nút hoàn tất giao hàng */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteOrder}
      >
        <Text style={styles.buttonText}>Hoàn tất giao hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  backButton: {
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  customerContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  customerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  customerInfo: {
    fontSize: 14,
    color: "#555",
  },

  productCard: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  productId: {
    fontSize: 14,
    fontWeight: "bold",
  },

  productText: {
    fontSize: 14,
    color: "#333",
  },

  productTotal: {
    fontSize: 14,
    color: "#e67e22",
    fontWeight: "bold",
  },

  finalPrice: {
    fontSize: 16,
    color: "#d35400",
    fontWeight: "bold",
  },

  completeButton: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});
