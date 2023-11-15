import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import RectangleCheckBox from "../common/card/checkbox/RectangleCheckBox";
import AddChoiceModal from "../common/modal/addchoicemodal/AddChoiceModal";
import { api } from "../../constants";
import { COLORS, icons } from "../../constants";
import styles from "./editeaddon.style";

const EditeAddon = () => {
  const route = useRoute();
  const storeid = route.params.storeid;
  const addonid = route.params.addonid;
  const addonData = route.params.addonData;

  const navigation = useNavigation();
  const [addonName, setAddonName] = useState("");
  const [oldAddonName, setOldAddonName] = useState("");
  const [buttonText, setButtonText] = useState("บันทึก");
  const [deleteText, setDeleteText] = useState("ลบตัวเลือกนี้");
  const [requir, setRequir] = useState(false);
  const [isAddChoiceModalVisible, setAddChoiceModalVisible] = useState(false);
  const [choices, setChoices] = useState([]);
  const [choiceName, setChoiceName] = useState("");


  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    if (addonid && addonData) {
      const foundAddonCategory = addonData.find((item) => item.addon_id === addonid);
      if (foundAddonCategory) {
        setAddonName(foundAddonCategory.addon_name);
        setOldAddonName(foundAddonCategory.addon_name);
        setRequir(foundAddonCategory.areRequir);
        setChoices(foundAddonCategory.choices || []);
      }
    }
  }, [addonid, addonData]);

  const handleAddChoiceSave = (newChoiceName) => {
    setChoices([...choices, newChoiceName]);
    setAddChoiceModalVisible(false);
  };

  const handleAddChoiceModalOpen = () => {
    setAddChoiceModalVisible(true);
  };


  const handleChoiceDelete = (index) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  const savePressHandle = async (path) => {
    if (addonName.trim() === "") {
      popup("ชื่อตัวเลือก", "กรุณาใส่ชื่อตัวเลือกก่อนกดบันทึก");
    } else {
      setButtonText("กรุณารอสักครู่...");
      if (addonid) {
        try {
          const response = await axios.put(`${api.api}SmartCanteen/store/addon/${addonid}`, {
            storeid: storeid,
            addonid:addonid,
            addonName: addonName,
            addonRequir: requir,
            choices: choices,
          });
          if (response.status === 200) {
            navigation.goBack();
          }
        } catch (error) {
          console.error("Update addon failed:", error);
        } finally {
          setButtonText("บันทึก");
        }
      } else if (addonData && addonData.some((item) => item.addon_name === addonName)) {
        popup("ชื่อตัวเลือกนี้ถูกใช้ไปแล้ว", "กรุณาใช้ชื่อตัวเลือกอื่น หรือลบตัวเลือกนั้นก่อน");
      } else {
        try {
          const response = await axios.post(`${api.api}SmartCanteen/store/addon`, {
            storeid: storeid,
            addonName: addonName,
            addonRequir: requir,
            choices: choices,
          });
          if (response.status === 201) {
            navigation.goBack();
          }
        } catch (error) {
          console.error("Save addon failed:", error);
        } finally {
          setButtonText("บันทึก");
        }
      }
    }
  };

  const deletePressHandle = async () => {
    setDeleteText("กำลังลบ...");
    if (addonid) {
      try {
        const response = await axios.delete(`${api.api}SmartCanteen/store/addon/${addonid}`, {
            data: { storeid: storeid },
        });
        if (response.status === 200) {
            navigation.goBack();
        }
      } catch (error) {
        console.error("Delete addon failed:", error);
      } finally {
        setDeleteText("ลบตัวเลือกนี้");
      }
    }
  };

  const popup = (title, text) => {
    Alert.alert(
      title,
      text,
      [
        {
          text: "OK",
          style: styles.inputText,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.text()}
          value={addonName}
          onChangeText={(text) => {
            setAddonName(text);
          }}
          placeholder="ชื่อตัวเลือก"
          placeholderTextColor={COLORS.gray}
        />
      </View>
      <View style={styles.underline(COLORS.lightGray)}>
        <RectangleCheckBox
          checked={requir}
          label="ลูกค้าจำเป็นต้องเลือกหรือไม่ ?"
          onPress={() => setRequir(!requir)}
        />
      </View>
      <View style={styles.choice}>
        <Text style={styles.text()}>ช้อยส์</Text>
        {choices.map((choice, index) => (
          <View key={index} style={styles.choiceItem}>
            <Text style={styles.SmallText()}>{choice.name}</Text>
            <View style={styles.backContainerChoice}>
              <Text style={styles.SmallText()}>฿{choice.price}</Text>
              <TouchableOpacity onPress={() => handleChoiceDelete(index)}>
                <View style={styles.deleteIconContainer}>
                  <Image
                  source={icons.x}
                  style={styles.deleteIcon}
                  resizeMode="contain"
                  />
                </View>
                
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button("95%")} onPress={handleAddChoiceModalOpen}>
          <Text style={styles.text(COLORS.white)}>+ เพิ่มช้อยส์</Text>
        </TouchableOpacity>
      </View>
      <AddChoiceModal
        visible={isAddChoiceModalVisible}
        onClose={() => setAddChoiceModalVisible(false)}
        onSave={handleAddChoiceSave}
      />

      {addonid ? (
        <TouchableOpacity style={styles.deleteContainer} onPress={() => deletePressHandle("menu_option")}>
          <Image source={icons.trashBin} style={styles.trashBin} />
          <Text style={[styles.text(COLORS.drakGray), { marginLeft: 8 }]}>{deleteText}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button("95%")} onPress={() => savePressHandle("menu_option")}>
          <Text style={styles.headerText(COLORS.white)}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditeAddon;
