// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { orderDetails } from "../constants/demo_data";
// import { SAFEAREAVIEW, COLORS } from "../constants";
// import { Header } from "../components";

// export default function OrderDetails() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { id } = route.params;
//   const order = orderDetails[id];

//   if (!order) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Không tìm thấy đơn hàng!</Text>
//       </View>
//     );
//   }

//   const handleConfirmOrder = () => {
//     Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xác nhận đơn hàng?", [
//       { text: "Hủy", style: "cancel" },
//       {
//         text: "Xác nhận",
//         onPress: () => {
//           Alert.alert("Thành công", "Đơn hàng đã được xác nhận!");
//           navigation.goBack();
//         },
//       },
//     ]);
//   };

//   const handleCancelOrder = () => {
//     Alert.alert("Hủy đơn hàng", "Bạn có chắc chắn muốn hủy đơn hàng này?", [
//       { text: "Không", style: "cancel" },
//       {
//         text: "Hủy đơn",
//         onPress: () => {
//           Alert.alert("Thành công", "Đơn hàng đã bị hủy!");
//           navigation.goBack();
//         },
//       },
//     ]);
//   };

//   const handleAcceptOrder = () => {
//     Alert.alert("Nhận giao", "Bạn có chắc chắn muốn nhận đơn hàng này?", [
//       { text: "Hủy", style: "cancel" },
//       {
//         text: "Xác nhận",
//         onPress: () => {
//           Alert.alert("Thành công", "Bạn đã nhận đơn hàng này!");
//           navigation.goBack();
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
//       <Header title="Chi Tiết Đơn Hàng" onPress={() => navigation.goBack()} />

//       <View style={styles.customerContainer}>
//         <Image source={{ uri: order.customer.image }} style={styles.customerImage} />
//         <View>
//           <Text style={styles.customerName}>{order.customer.name}</Text>
//           <Text style={styles.customerInfo}>📞 {order.customer.phone}</Text>
//           <Text style={styles.customerInfo}>✉️ {order.customer.email}</Text>
//           <Text style={styles.customerInfo}>📍 {order.customer.address}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={order.products}
//         keyExtractor={(item) => item.productId}
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Text style={styles.productId}>Mã SP: {item.productId}</Text>
//             <Text style={styles.productText}>🌸 Loại hoa: {item.flowers.join(", ")}</Text>
//             <Text style={styles.productText}>💰 Giá hoa: {item.unitPrice.toLocaleString()}đ</Text>
//             <Text style={styles.productText}>🎀 Giá bó hoa: {item.bouquetPrice.toLocaleString()}đ</Text>
//             <Text style={styles.productTotal}>🛒 Giá tổng: {item.totalFlowerPrice.toLocaleString()}đ</Text>
//             <Text style={styles.finalPrice}>💵 Giá cuối: {item.finalPrice.toLocaleString()}đ</Text>
//           </View>
//         )}
//       />

//       {order.orderStatus === "Shipped" ? (
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
//             <Text style={styles.buttonText}>Hủy đơn</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
//             <Text style={styles.buttonText}>Xác nhận</Text>
//           </TouchableOpacity>
          
//         </View>
//       ) : order.orderStatus === "Pending" ? (
//         <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptOrder}>
//           <Text style={styles.buttonText}>Nhận giao</Text>
//         </TouchableOpacity>
//       ) : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 20,
//   },
//   customerContainer: {
//     flexDirection: "row",
//     backgroundColor: "#f0f0f0",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   customerImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//   },
//   customerName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   customerInfo: {
//     fontSize: 14,
//     color: "#555",
//   },
//   productCard: {
//     backgroundColor: "#f8f8f8",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   productId: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   productText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   productTotal: {
//     fontSize: 14,
//     color: "#e67e22",
//     fontWeight: "bold",
//   },
//   finalPrice: {
//     fontSize: 16,
//     color: "#d35400",
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   confirmButton: {
//     flex: 1,
//     backgroundColor: "#27ae60",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   cancelButton: {
//     flex: 1,
//     backgroundColor: "#c0392b",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginRight: 10,
//   },
//   acceptButton: {
//     backgroundColor: "#2980b9",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//     textAlign: "center",
//     marginTop: 50,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SAFEAREAVIEW, COLORS } from "../constants";
import { Header } from "../components";
import { useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

async function fetchOrderDetails(orderId, token) {
  const url = `https://custom-florist.onrender.com/custom-florist/api/v1/orders/${orderId}`;
  const { authToken } = useAuth();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`API Error: ${data.message}`);
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
}

export default function OrderDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, token } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrderDetails() {
      const orderData = await fetchOrderDetails(id, token);
      setOrder(orderData);
      setLoading(false);
    }
    getOrderDetails();
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy đơn hàng!</Text>
      </View>
    );
  }

  // Xác định trạng thái đơn hàng
  const orderStatus = order.deliveryHistories.length > 0 ? "Hoàn thành" : "Nhận đơn";

  return (
    <View style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
      <Header title="Chi Tiết Đơn Hàng" onPress={() => navigation.goBack()} />

      <View style={styles.customerContainer}>
        <View>
          <Text style={styles.customerName}>{order.userName}</Text>
          <Text style={styles.customerInfo}>📞 {order.phone}</Text>
          <Text style={styles.customerInfo}>📍 {order.shippingAddress}</Text>
        </View>
      </View>

      <FlatList
        data={order.orderItems}
        keyExtractor={(item) => item.orderItemId.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productText}>🌸 Bó hoa: {item.bouquetName}</Text>
            <Text style={styles.productText}>💰 Giá: {item.subTotal.toLocaleString()}đ</Text>
            <Text style={styles.productText}>🛒 Số lượng: {item.quantity}</Text>
          </View>
        )}
      />

      {orderStatus === "Nhận đơn" ? (
        <TouchableOpacity style={styles.acceptButton} onPress={() => Alert.alert("Nhận đơn", "Bạn đã nhận đơn hàng này!") }>
          <Text style={styles.buttonText}>Nhận giao</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert("Hủy đơn", "Đơn hàng đã bị hủy!") }>
            <Text style={styles.buttonText}>Hủy đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={() => Alert.alert("Xác nhận", "Đơn hàng đã hoàn thành!") }>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  customerContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
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
  productText: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#c0392b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: "#2980b9",
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