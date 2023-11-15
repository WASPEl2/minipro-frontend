import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import styles from "./manageorder.style";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

import { api } from "../../constants";
import useFetch from "../../hook/useFetch";
import { COLORS } from "../../constants";
import CircularCheckbox from "../common/card/checkbox/CircularCheckbox";
import TransferSlipModal from "../common/modal/transferslipmodal/TransferSlipModal ";

const ManageOrder = () => {
  const route = useRoute();
  const storeid = route.params.storeid;

  const { data, isLoading, error, refetch } = useFetch("showOrderbystatus", { storeid: storeid });

  const [selectBar, setSelectBar] = useState("pending");
  const [selectedPendingOrders, setSelectedPendingOrders] = useState([]);
  const [selectedCookingOrders, setSelectedCookingOrders] = useState([]);
  const [selectedWaitingOrders, setSelectedWaitingOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transferslipRef, setTransferslipRef] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [selectBar]);

  useEffect(() => {
    refetch();
  }, [selectBar]);

  const filteredOrders = data?.filter((order) => {
    switch (selectBar) {
      case "pending":
        return order.order_status === "pending";
      case "cooking":
        return order.order_status === "cooking";
      case "waiting":
        return order.order_status === "waiting";
      default:
        return false;
    }
  });

  const toggleOrderSelection = (orderId) => {
    switch (selectBar) {
      case "pending":
        toggleSelection(selectedPendingOrders, setSelectedPendingOrders, orderId);
        break;
      case "cooking":
        toggleSelection(selectedCookingOrders, setSelectedCookingOrders, orderId);
        break;
      case "waiting":
        toggleSelection(selectedWaitingOrders, setSelectedWaitingOrders, orderId);
        break;
      default:
        break;
    }
  };

  const toggleSelection = (selectedOrders, setSelectedOrders, orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelectedOrders) => prevSelectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders((prevSelectedOrders) => [...prevSelectedOrders, orderId]);
    }
  };

  const getButtonText = () => {
    switch (selectBar) {
      case "pending":
        return `เริ่มทำอาหาร (${selectedPendingOrders.length})`;
      case "cooking":
        return `ทำเสร็จแล้ว (${selectedCookingOrders.length})`;
      case "waiting":
        return `รับเรียบร้อย (${selectedWaitingOrders.length})`;
      default:
        return "เริ่มทำอาหาร";
    }
  };

  const handleTransferslipPress = (transferslipRef) => {
    setTransferslipRef(transferslipRef);
    setShowModal(true);
  };

  const handleButtonPress = () => {
    // Handle the logic for the selected orders based on their order_status
    switch (selectBar) {
      case "pending":
        console.log("Selected Pending Orders: ", selectedPendingOrders);
        updateStatus(selectBar,selectedPendingOrders)
        setSelectBar("cooking")
        setSelectedPendingOrders([])
        break;
      case "cooking":
        console.log("Selected In-Progress Orders: ", selectedCookingOrders);
        updateStatus(selectBar,selectedCookingOrders)
        setSelectBar("waiting")
        setSelectedCookingOrders([])
        break;
      case "waiting":
        console.log("Selected Waiting Orders: ", selectedWaitingOrders);
        updateStatus(selectBar,selectedWaitingOrders)
        setSelectBar("pending")
        // setSelectedWaitingOrders([])
        break;
      default:
        break;
    }
  };
  const updateStatus = async (status, data) => {
    try {
      const response = await axios.post(`${api.api}SmartCanteen/store/menu/updatestatus`, {
        last_status: status,
        order_id_list: data
      });
      if (response.status === 201) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('update status failed:', error);
    }
  }
  
  const getSelectedOrdersArray = () => {
    switch (selectBar) {
      case "pending":
        return selectedPendingOrders;
      case "cooking":
        return selectedCookingOrders;
      case "waiting":
        return selectedWaitingOrders;
      default:
        return [];
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderContainer} onPress={() => toggleOrderSelection(item.order_id)}>
      <View style={styles.checkList}>
        <CircularCheckbox
          checked={getSelectedOrdersArray().includes(item.order_id)}
          onPress={() => toggleOrderSelection(item.order_id)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.orderHeaderContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.boldText()}>[{item.order_id}]  {item.customer_username} |</Text>
            <TouchableOpacity onPress={() => handleTransferslipPress(item.transferslip_ref)}>
              <Text style={styles.littleText(COLORS.primary)}> รายละเอียด</Text>
            </TouchableOpacity>
            {showModal && (
                <TransferSlipModal
                    visible={showModal}
                    transferslipRef={transferslipRef}
                    closeModal={() => setShowModal(false)}
                />
            )}
          </View>
          <Text style={styles.boldText()}>฿ {item.order_totalprice}</Text>
        </View>
        <FlatList
          data={item.menu_items}
          keyExtractor={(menu) => `${item.order_id}-${menu.menu_name}`}
          renderItem={({ item: menu }) => (
            <View>
              <View style={styles.orderHeaderContainer}>
                <Text style={styles.boldHeaderText(COLORS.drakGray)}>{menu.menu_name}</Text>
                <Text style={styles.boldHeaderText(COLORS.drakGray)}>{menu.menu_quantity}x</Text>
              </View>
              {menu.addon_items && menu.addon_items.length > 0 && (
                <View>
                  <FlatList
                    data={menu.addon_items}
                    keyExtractor={(addon) => addon.addon_name}
                    renderItem={({ item: addon }) => (
                      <Text style={styles.boldHeaderText(COLORS.gray)}>{`   +  ${addon.addon_name} : ${addon.choices}`}</Text>
                    )}
                  />
                </View>
              )}
              {menu.menu_description ? <Text style={styles.boldHeaderText(COLORS.gray)}>{menu.menu_description}</Text>:<></>}
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.underline(selectBar === "pending" ? COLORS.primary : "")}
          onPress={() => setSelectBar("pending")}
        >
          <Text style={styles.headerText(selectBar === "pending" ? COLORS.primary : "")}>ใหม่</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.underline(selectBar === "cooking" ? COLORS.primary : "")}
          onPress={() => setSelectBar("cooking")}
        >
          <Text style={styles.headerText(selectBar === "cooking" ? COLORS.primary : "")}>กำลังปรุง</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.underline(selectBar === "waiting" ? COLORS.primary : "")}
          onPress={() => setSelectBar("waiting")}
        >
          <Text style={styles.headerText(selectBar === "waiting" ? COLORS.primary : "")}>รอลูกค้ามารับ</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button("95%")} onPress={() => handleButtonPress()}>
          <Text style={styles.headerText()}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ManageOrder;
