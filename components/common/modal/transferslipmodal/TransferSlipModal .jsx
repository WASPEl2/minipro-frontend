import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, FONT } from "../../../../constants";
import axios from "axios";

import { api } from "../../../../constants";

const TransferSlipModal = ({ visible, closeModal, transferslipRef }) => {
  const [transferslipData, setTransferslipDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransferslipDetail = async () => {
      try {
        const response = await axios.get(`${api.api}SmartCanteen/store/transferslipcheck/${transferslipRef}`);
        if (response.status === 200) {
          setTransferslipDetail(response.data.data);
        } else {
          console.error("Failed to fetch transfer slip details");
        }
      } catch (error) {
        console.error("An error occurred while fetching transfer slip details:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchTransferslipDetail();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>รายละเอียด Transfer Slip</Text>
          {loading ? (
            <ActivityIndicator style={styles.loading} size={100} color={COLORS.primary} />
          ) : (
            <>
              <Image
                source={{ uri: transferslipData?.transferslip_image }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.label}>{`เลขอ้างอิง : ${transferslipData?.transferslip_ref}`}</Text>
              <Text style={styles.label}>{`Timestamp: ${transferslipData?.transferslip_timestamp}`}</Text>
              <Text style={styles.label}>{`Price: ${transferslipData?.transferslip_price}`}</Text>
              <Text style={styles.label}>{`Sender: ${transferslipData?.transferslip_sender}`}</Text>
              <Text style={styles.label}>{`Receiver: ${transferslipData?.transferslip_receiver}`}</Text>
              
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text style={styles.buttonText}>ปิด</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  modalTitle: {
    fontFamily: FONT.regular,
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: 14,
    marginTop: 10,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: FONT.regular,
    color: COLORS.white,
  },
});

export default TransferSlipModal;