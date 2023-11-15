import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import RectangleCheckBox from "../common/card/checkbox/RectangleCheckBox";
import useFetch from "../../hook/useFetch";
import { COLORS, icons, images } from "../../constants";
import styles from "./editemenu.style";
import { api } from "../../constants";

const EditeMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const storeid = route.params.storeid;
  const menuid = route.params.menuid;
  const menuData = route.params.menuData;


  const { data: addonData, isLoading: addonLoading, error: addonError,refetch: addonRefetch } = useFetch("addon", { storeid: storeid });
  const { data: menutypeData, isLoading: menutypeLoading, error: menutypeError,refetch: menutypeRefetch } = useFetch("menutype", { storeid: storeid });

  const { height, width } = Dimensions.get("window");

  const [foodImage, setFoodImage] = useState(null);
  const [menuName, setMenuName] = useState("")
  const [menuDescription, setMenuDescription] = useState("")
  const [menuPrice, setMenuPrice] = useState("")
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedMenuTypes, setSelectedMenuTypes] = useState([]);
  const [buttonText, setButtonText] = useState("บันทึก");
  const [deleteText, setdeleteText] = useState("ลบเมนูนี้");



  useFocusEffect(
    React.useCallback(() => {
      addonRefetch();
      menutypeRefetch();
    }, [])
  );

  useEffect(() => {
    if (menuid && menuData) {
      const foundMenuCategory = menuData.find((item) =>
        item.menu_items.some((menuItem) => menuItem.menu_id === menuid)
      );

      if (foundMenuCategory) {
        const foundMenuItem = foundMenuCategory.menu_items.find(
          (menuItem) => menuItem.menu_id === menuid
        );

        if (foundMenuItem) {
          
          setFoodImage(`data:image/jpeg;base64,${foundMenuItem.menu_image}`);
          setMenuName(foundMenuItem.menu_name);
          setMenuDescription(foundMenuItem.menu_description);
          setMenuPrice(foundMenuItem.menu_price);
          setSelectedAddons(foundMenuItem.menu_addon || []);
          setSelectedMenuTypes(foundMenuItem.menu_menutype || []);
        }
      }
    }
  }, [menuid, menuData]);


  const toggleAddonSelection = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const toggleMenuTypeSelection = (menuTypeId) => {
    if (selectedMenuTypes.includes(menuTypeId)) {
      setSelectedMenuTypes(selectedMenuTypes.filter((id) => id !== menuTypeId));
    } else {
      setSelectedMenuTypes([...selectedMenuTypes, menuTypeId]);
    }
  };

  const handleButtonPress = async (path) => {
    if (path == "menu_option"){
      setButtonText("กำลังบันทึก ...")
        try {
            const formData = new FormData();

            if (foodImage) {
                const uri = foodImage;
                const fileType = uri.split(".").pop();
                formData.append("foodImage", {
                    uri,
                    name: `foodImage.${fileType}`,
                    type: `image/${fileType}`,
                });
            }
            formData.append("storeid", storeid);
            formData.append("menu_name", menuName);
            formData.append("menu_description", menuDescription);
            formData.append("menu_price", menuPrice);
            formData.append("menu_addon", selectedAddons);
            formData.append("menu_menutype", selectedMenuTypes);
            if(menuid){
              formData.append("menu_id", menuid);
            }

            const response = await axios.post(`${api.api}SmartCanteen/store/menu`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                navigation.navigate("menu_option",{
                  storeid: storeid,
                });
            }

        } catch (error) {
            console.error('Save menu failed:', error);
        } finally {
            setButtonText("บันทึก")
        }
        return
    } else {
      navigation.navigate(path,{
        storeid: storeid,
      });
    }
  }

const deletePressHandle = async () => {
  if (menuid) {
      setdeleteText("กำลังลบ...");
      try {
        const response = await axios.delete(
          `${api.api}SmartCanteen/store/menu/${menuid}`,{
            data: { store_id: storeid },
        }
        );
        if (response.status === 200) {
          // Menu deleted successfully, you can navigate back or perform other actions
          navigation.goBack();
        }
      } catch (error) {
        console.error('Delete menu failed:', error);
      } finally {
        setdeleteText("ลบเมนูนี้");
      }
    }
  };







  const pickImage = async () => {
    try {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!data.canceled) {
        setFoodImage(data.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {foodImage ? (
              <Image
                source={{ uri: foodImage }}
                style={styles.foodImage(width * 0.275)}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={images.emptyFoodImage}
                style={styles.foodImage(width * 0.275)}
                resizeMode="contain"
              />
            )}
            <View style={styles.editeContainer}>
              <Image source={icons.camera} style={styles.camera} resizeMode="contain" />
              <Text style={styles.text()}>แก้ไข</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.imageTextContainer}>
            <Text style={styles.text(COLORS.gray)}>ใส่รูปอาหารสวย ๆ ช่วยให้</Text>
            <Text style={styles.text(COLORS.gray)}>ลูกค้าตัดสินใจสั่งอาหารได้</Text>
            <Text style={styles.text(COLORS.gray)}>ง่ายขึ้น</Text>
          </View>
        </View>
        <View style={{paddingTop:'3.2%',borderTopWidth:1,borderColor:COLORS.lightGray}}>
          <Text style={styles.miniHeaderText()}>ชื่อเมนู</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.text()}
              value={menuName}
              onChangeText={(text) => {
                setMenuName(text);
              }}
              placeholder="ชื่อเมนู"
              placeholderTextColor={COLORS.gray}
            />
          </View>
          <Text style={styles.miniHeaderText()}>คำอธิบายเมนู</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.text()}
              value={menuDescription}
              onChangeText={(text) => {
                setMenuDescription(text);
              }}
              placeholder="คำอธิบายเมนู"
              placeholderTextColor={COLORS.gray}
            />
          </View>
          <Text style={styles.miniHeaderText()}>ราคา</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.miniHeaderText()}>฿</Text>
            <View style={{marginHorizontal:"2.4%"}}/>
              <TextInput
                style={styles.text()}
                value={menuPrice}
                onChangeText={(text) => {
                  setMenuPrice(text);
                }}
                placeholder="ราคาสินค้า"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
              />
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.miniHeaderText()}>ตัวเลือก</Text>
            {addonLoading ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : addonError ? (
              <Text style={styles.text(COLORS.red)}>Error loading addon</Text>
            ) : (
              <View>    
                {addonData.map((addon, index) => (
                  <View key={index}>
                    <RectangleCheckBox
                      checked={selectedAddons.includes(addon.addon_id)}
                      label={addon.addon_name}
                      onPress={() => toggleAddonSelection(addon.addon_id)}
                    />
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity 
              style={styles.button("100%",COLORS.lightGray)} 
              onPress={() => {handleButtonPress("editeaddon")}}
            >
              <Text style={styles.text(COLORS.black)} >+ เพิ่มช้อยส์</Text>
            </TouchableOpacity>
            <Text style={styles.miniHeaderText()}>เพิ่มในหมวดหมู่</Text>
            {menutypeLoading ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : menutypeError ? (
              <Text style={styles.text(COLORS.red)}>Error loading menu type</Text>
            ) : (
              <View>
                {menutypeData.map((menutype, index) => (
                  <View key={index}>
                    <RectangleCheckBox
                      checked={selectedMenuTypes.includes(menutype.menu_type_id)}
                      label={menutype.menu_type_name}
                      onPress={() => toggleMenuTypeSelection(menutype.menu_type_id)} 
                    />
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity 
              style={styles.button("100%",COLORS.lightOrange)} 
              onPress={() => {handleButtonPress("editemenutype")}}
            >
              <Text style={styles.text(COLORS.primary)} >+ สร้างหมวดหมู่</Text>
            </TouchableOpacity>
          </View>

        </View>
        {menuid ? 
        <TouchableOpacity style={styles.deleteContainer} onPress={() => deletePressHandle()}>
          <Image
            source={icons.trashBin}
            style={styles.trashBin}
          />
          <Text style={[styles.text(COLORS.drakGray),{marginLeft:8}]}>{deleteText}</Text>
        </TouchableOpacity> : <></>}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button("95%")} onPress={() => handleButtonPress("menu_option")}>
          <Text style={styles.headerText(COLORS.white)}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditeMenu;
