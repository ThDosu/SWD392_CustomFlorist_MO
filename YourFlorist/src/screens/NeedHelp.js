import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Clipboard,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";
import { Header } from "../components";

export default function NeedHelp() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Đã sao chép", `${text} đã được sao chép vào bộ nhớ tạm.`);
  };

  const guides = [
    { id: "1", icon: "cube-outline", title: "Cách nhận đơn hàng mới", description: "Hướng dẫn nhận và xác nhận đơn hàng nhanh chóng." },
    { id: "2", icon: "rocket-outline", title: "Cách giao hàng đúng thời gian", description: "Mẹo và hướng dẫn để giao hàng đúng giờ, tránh trễ đơn." },
    { id: "3", icon: "cash-outline", title: "Hướng dẫn thanh toán và nhận tiền", description: "Cách kiểm tra số dư và nhận tiền sau mỗi đơn giao thành công." },
  ];

  function ContactSupportModal({ modalVisible, setModalVisible, copyToClipboard }) {
    return (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        backdropOpacity={0.5}
      >
        <View
          style={{
            width: SIZES.width - 60,
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 25,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black, marginBottom: 15 }}>
            📞 Liên Hệ Hỗ Trợ
          </Text>

          <View style={{ width: "100%", marginBottom: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 16, flex: 1 }}>Số điện thoại: 0945-733-877</Text>
              <TouchableOpacity onPress={() => copyToClipboard("0945-733-877")}>
                <Ionicons name="copy-outline" size={24} color={COLORS.green} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 16, flex: 1 }}>Email: dungpltse184549@fpt.edu.vn</Text>
              <TouchableOpacity onPress={() => copyToClipboard("dungpltse184549@fpt.edu.vn")}>
                <Ionicons name="copy-outline" size={24} color={COLORS.green} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "60%",
              height: 40,
              backgroundColor: COLORS.red,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
      <Header title="Hỗ Trợ" onPress={() => navigation.goBack()} />

      {/* Logo */}
      <View style={{ width: "100%", alignItems: "center", marginVertical: 20 }}>
        <Image source={require("../assets/Logo.png")} style={{ width: 320, height: 160, resizeMode: "contain" }} />
      </View>

      {/* Tiêu đề hướng dẫn */}
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000", marginLeft: 20, marginBottom: 10 }}>
        ❓ Hướng Dẫn Sử Dụng
      </Text>

      {/* Danh sách hướng dẫn */}
      <FlatList
        data={guides}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#f9f9f9",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
              alignItems: "center",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: { width: 1, height: 2 },
            }}
          >
            <Ionicons name={item.icon} size={28} color={COLORS.primary} style={{ marginRight: 15 }} />
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>{item.title}</Text>
              <Text style={{ fontSize: 14, color: "#555" }}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Nút gọi hỗ trợ */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          paddingVertical: 15, // Tăng chiều cao để dễ bấm hơn
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          position: "absolute", // Giữ cố định ở cuối màn hình
          bottom: 30, // Cách lề dưới 30px
          left: "10%", // Căn giữa theo chiều ngang
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5, // Hiệu ứng bóng trên Android
        }}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Gọi Hỗ Trợ</Text>
      </TouchableOpacity>

      {/* Modal liên hệ hỗ trợ */}
      <ContactSupportModal modalVisible={modalVisible} setModalVisible={setModalVisible} copyToClipboard={copyToClipboard} />
    </SafeAreaView>
  );
}
