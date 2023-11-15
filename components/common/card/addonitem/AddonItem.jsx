import React from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { icons, COLORS } from "../../../../constants";
import styles from "../../../menuoption/menuoption.style";

const AddonItem = ({ addon, clickedAddonId, clickedAddonIdHandler, toggleChoiceSwitch, handlebuttonPress }) => {
  
  
  return (
    <View key={addon.addon_id} style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={() => clickedAddonIdHandler(addon.addon_id)}
      >
        <Text style={styles.headerText()}>{addon.addon_name}</Text>
        <Image
          source={icons.rightArrow}
          style={styles.rightArrow(clickedAddonId === addon.addon_id)}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {clickedAddonId === addon.addon_id ? (
        <View>
          <View style={styles.flexContainer}>
            <TouchableOpacity>
              <Text style={styles.littleText(COLORS.primary)}>รายการที่ใช้</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 8 }}>|</Text>
            <TouchableOpacity onPress={() => handlebuttonPress("editeaddon", addon.addon_id)}>
              <Text style={styles.littleText(COLORS.primary)}>แก้ไขข้อมูล</Text>
            </TouchableOpacity>
          </View>
          {addon.choices.map((choice, index) => (
            <View key={index}>
              <View style={styles.choiceItem}>
                <Text style={styles.littleText()}>{choice.name}</Text>
                <View style={styles.flexContainer}>
                  <Text style={styles.littleText()}>
                    {choiceStates[choice.name].isLoading
                      ? "กำลังเปลี่ยน..."
                      : choiceStates[choice.name].areSale
                      ? "มีจำหน่าย"
                      : "หยุดจำหน่าย"}
                  </Text>
                  <Switch
                    trackColor={{ false: COLORS.lightGray, true: COLORS.lightOrange }}
                    thumbColor={choiceStates[choice.name].areSale ? COLORS.primary : COLORS.gray}
                    value={choiceStates[choice.name].areSale || false}
                    onValueChange={() => toggleChoiceSwitch(choice.name, addon.addon_id)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={{ paddingBottom: "2.4%" }} />
      )}
    </View>
  );
};

export default AddonItem;
