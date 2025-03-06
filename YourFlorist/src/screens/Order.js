import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { orders } from "../constants/demo_data";

export default function Order() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate("NeedHelp")}
          style={{ paddingHorizontal: 14, paddingVertical: 15 }}
        >
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* ✅ Canh giữa tiêu đề */}
      <Text style={styles.title}>DANH SÁCH ĐƠN HÀNG</Text>

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
        data={orders.filter(
          (order) =>
            order.status === "Đang giao" || order.status === "Chưa giao"
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate("OrderDetails", { id: item.id })}
          >
            {/* Ảnh người mua */}
            <Image source={{ uri: item.userImage }} style={styles.userImage} />

            {/* Thông tin đơn hàng */}
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{item.title}</Text>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>

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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ✅ Cập nhật styles
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

  userImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
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

  orderStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "blue",
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
};
