import { View, Text, TouchableOpacity, Image, FlatList, Modal, Clipboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function NeedHelp() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Đã sao chép", `"${text}" đã được sao chép vào bộ nhớ tạm.`);
  };

  const guides = [
    { id: "1", title: "📦 Cách nhận đơn hàng mới", description: "Hướng dẫn nhận và xác nhận đơn hàng nhanh chóng." },
    { id: "2", title: "🚀 Cách giao hàng đúng thời gian", description: "Mẹo và hướng dẫn để giao hàng đúng giờ, tránh trễ đơn." },
    { id: "3", title: "💰 Hướng dẫn thanh toán và nhận tiền", description: "Cách kiểm tra số dư và nhận tiền sau mỗi đơn giao thành công." },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", paddingHorizontal: 20, alignItems: "center" }}>
      {/* Nút Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 20, left: 20 }}>
        <Ionicons name="arrow-back" size={28} color="#000000" />
      </TouchableOpacity>

      {/* Logo căn giữa */}
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <Image 
          source={require("../assets/Logo.png")} 
          style={{ width: 320, height: 160, resizeMode: "contain" }} 
        />
      </View>

      {/* Tiêu đề căn phải */}
      <Text style={{ 
        fontSize: 24, 
        fontWeight: "bold", 
        color: "#000000", 
        marginTop: 10, 
        alignSelf: "flex-start"
      }}>
        ❓ Hướng Dẫn Sử Dụng
      </Text>

      {/* Danh sách bài viết hướng dẫn */}
      <FlatList
        data={guides}
        keyExtractor={(item) => item.id}
        style={{ width: "100%", marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={{
            backgroundColor: "#f9f9f9",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 }
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: "#555" }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Nút Gọi Hỗ Trợ căn giữa */}
      <TouchableOpacity 
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
          width: "80%"
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>📞 Gọi Hỗ Trợ</Text>
      </TouchableOpacity>

      {/* Popup liên hệ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          <View style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 10,
            width: "80%",
            alignItems: "center"
          }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}>📞 Liên Hệ Hỗ Trợ</Text>

            {/* Số điện thoại với nút Copy */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 16, color: "#000000", flex: 1 }}>Số điện thoại: 0945-733-877</Text>
              <TouchableOpacity onPress={() => copyToClipboard("0945-733-877")}>
                <Ionicons name="copy-outline" size={24} color="blue" />
              </TouchableOpacity>
            </View>

            {/* Email với nút Copy */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 16, color: "#000000", flex: 1 }}>Email: dungpltse184549@fpt.edu.vn</Text>
              <TouchableOpacity onPress={() => copyToClipboard("dungpltse184549@fpt.edu.vn")}>
                <Ionicons name="copy-outline" size={24} color="blue" />
              </TouchableOpacity>
            </View>

            {/* Nút đóng popup */}
            <TouchableOpacity 
              style={{
                backgroundColor: "#ff3333",
                padding: 10,
                borderRadius: 5,
                width: "50%",
                alignItems: "center",
                marginTop: 20
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
