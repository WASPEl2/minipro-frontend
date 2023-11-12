import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Switch } from "react-native";
import { FONT ,COLORS } from "../../../../constants";

const AddChoiceModal = ({ visible, onClose, onSave }) => {
  const [choiceName, setChoiceName] = useState("");
  const [choicePrice, setChoicePrice] = useState("");

  const handleSave = () => {
    if (choiceName.trim() === "") {
      alert("กรุณากรอกชื่อช้อยส์");
      return;
    }
    if (choicePrice.trim() === "") {
      setChoicePrice("0.0");
      return;
    }
    onSave({ name: choiceName, price: choicePrice, areSale: true });
    setChoiceName("");
    setChoicePrice("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>เพิ่มช้อยส์</Text>
          <TextInput
            style={styles.input}
            placeholder="ชื่อช้อยส์"
            value={choiceName}
            onChangeText={(text) => setChoiceName(text)}
          />
          <View style={styles.input}>
            <Text style={{margin:8}}>฿</Text>
            <TextInput
              placeholder="0.0"
              value={choicePrice}
              onChangeText={(text) => setChoicePrice(text)}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>บันทึก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>ยกเลิก</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily:FONT.regular,
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    fontFamily:FONT.regular,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    flexDirection:'row',
    alignItems:'center',
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
    fontFamily:FONT.regular,
    color: COLORS.white,
  },
})

export default AddChoiceModal;
