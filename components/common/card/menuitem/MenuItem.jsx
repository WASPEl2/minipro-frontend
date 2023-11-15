import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../../menuoption/menuoption.style";
import { icons, COLORS } from "../../../../constants";

const MenuItem = ({ menu, clickedMenuId, clickedAddonIdHandler, handlebuttonPress }) => {
  
  
  return (
    <View key={menu.menu_id} style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.nameContainer}
        onPress={() => clickedAddonIdHandler(menu.menu_id)}
      >
        <Text style={styles.headerText()}>{menu.menu_name}</Text>
        <Image
          source={icons.rightArrow}
          style={styles.rightArrow(clickedMenuId === menu.menu_id)}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {clickedMenuId === menu.menu_id ? (
        <View>
          <View style={styles.flexContainer}>
            <TouchableOpacity>
              <Text style={styles.littleText(COLORS.primary)}>รายการที่ใช้</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 8 }}>|</Text>
            <TouchableOpacity onPress={() => handlebuttonPress("editemenu", menu.menu_id)}>
              <Text style={styles.littleText(COLORS.primary)}>แก้ไขข้อมูล</Text>
            </TouchableOpacity>
          </View>
          {/* Additional menu item details can be displayed here */}
        </View>
      ) : (
        <View style={{ paddingBottom: "2.4%" }} />
      )}
    </View>
  );
};

export default MenuItem;
