import React, { useEffect, useState } from "react";
import { View, Text, Switch, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from "axios";


import useFetch from "../../hook/useFetch";
import { COLORS, icons, images } from "../../constants";
import { api } from "../../constants";
import styles from "../menuoption/menuoption.style";
import { useRouter } from "expo-router";

const Menuoption = () => {
  const router = useRouter();
  const route = useRoute();
  const storeid = route.params.storeid;
  const navigation = useNavigation();

  const { data: addonData, isLoading: addonLoading, error: addonError,refetch: addonRefetch } = useFetch("addon", { storeid: storeid });
  const { data: menuData, isLoading: menuLoading, error: menuError,refetch: menuRefetch } = useFetch("menus", { storeid: storeid });

  const [clickedAddonId, setClickedAddonId] = useState(null);
  const [clickedMenuId, setClickedMenuId] = useState(null);
  const [selectMenubar, SetSelectMenuBar] = useState(true);
  const [choiceStates, setChoiceStates] = useState({});

  const { height, width } = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      addonRefetch();
      menuRefetch();
    }, [])
  );

  useEffect(() => {
    if (addonData && addonData.length > 0) {
      const initialChoiceStates = {};
      addonData.forEach((addon) => {
        addon.choices.forEach((choice) => {
          initialChoiceStates[choice.name] = {
          areSale: choice.areSale,
          isLoading: false,
        };
        });
      });
      setChoiceStates(initialChoiceStates);
    }
  }, [addonData]);

  const toggleChoiceSwitch = async (choiceName, addon_id) => {
    try {
      setChoiceStates((prevState) => ({
        ...prevState,
        [choiceName]: {
          ...prevState[choiceName],
          isLoading: true,
        },
      }));

      const choiceData = {
        name: choiceName,
        areSale: !choiceStates[choiceName].areSale,
      };

      const response = await axios.put(
        `${api.api}SmartCanteen/store/addon/choice/${addon_id}`,
        choiceData
      );

      if (response.status === 200) {
        setChoiceStates((prevState) => ({
          ...prevState,
          [choiceName]: {
            ...prevState[choiceName],
            isLoading: false,
            areSale: !prevState[choiceName].areSale,
          },
        }));
      } else {
        console.error('Unsuccessful response:', response);
      }
    } catch (error) {
      console.error('Error updating choice:', error);
    } finally {
      setChoiceStates((prevState) => ({
        ...prevState,
        [choiceName]: {
          ...prevState[choiceName],
          isLoading: false,
        },
      }));
    }
  };


  const handlebuttonPress = (path, id) => {
    if(path == "editeaddon"){
      navigation.navigate("editeaddon", {
        storeid: storeid,
        addonid: id,
        addonData:addonData
      });
    } else if (path == "editemenu" ){
      navigation.navigate("editemenu", {
        storeid: storeid,
        menuid: id,
        menuData: menuData
      });
    } else {
      navigation.navigate(path, {
        storeid: storeid,
      });
    }
  };

  const clickedAddonIdHandler = (addonid) => {
    if(clickedAddonId != addonid)
      setClickedAddonId(addonid)
    else
      setClickedAddonId(null)
  };
  const clickedMenuIdHandler = (meun) => {
    if(clickedMenuId != meun)
      setClickedMenuId(meun)
    else
      setClickedMenuId(null)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.underline(selectMenubar ? COLORS.primary : '')}
          onPress={() => { SetSelectMenuBar(true) }}
        >
          <Text style={styles.headerText(selectMenubar ? COLORS.primary : '')}>เมนู</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.underline(selectMenubar ? '' : COLORS.primary)}
          onPress={() => { SetSelectMenuBar(false) }}
        >
          <Text style={styles.headerText(selectMenubar ? '' : COLORS.primary)}>ตัวเลือก</Text>
        </TouchableOpacity>
      </View>
      {selectMenubar ?
        <View style={styles.container}>
          {menuLoading ? (
            <ActivityIndicator style={styles.loading} size={100} color={COLORS.primary} />
          ) : menuError ? (
            <Text>Something went wrong</Text>
          ) : (
            menuData && menuData.length > 0 ? (
              <ScrollView style={{ height: "100%" }}>
                {menuData.map((menu_type) => (
                  <View key={menu_type.menu_type_id} style={styles.subContainer}>
                    <TouchableOpacity
                      style={styles.nameContainer}
                      onPress={() => {clickedMenuIdHandler(menu_type.menu_type_id)}}
                    >
                      <Text style={styles.headerText()}>{menu_type.menu_type_name}</Text>
                      <Image
                        source={icons.rightArrow}
                        style={styles.rightArrow(clickedMenuId === menu_type.menu_type_id)}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    {clickedMenuId === menu_type.menu_type_id ? <View >
                      { menu_type.menu_type_name == "ยังไม่ถูกจัดหมวดหมู่" ? <Text style={styles.text('red')}>* ลูกค้าไม่สามารถสั่งได้</Text> : <></>}
                      <View style={{padding:"0.5%"}}/>
                      

                      {menu_type.menu_items.map((menu) => (
                        <View key={menu.menu_id} >
                        {menu.menu_id !== null ? (
                          <TouchableOpacity style={styles.menuItem} onPress={() => {handlebuttonPress("editemenu",menu.menu_id)}}>
                            {menu.menu_image ? (
                              <Image
                                source={{ uri: `data:image/jpeg;base64,${menu.menu_image}` }}
                                style={styles.menuImage}
                                resizeMode="cover"
                              />
                            ) : (
                              <Image
                                source={images.emptyFoodImage}
                                style={styles.menuImage}
                                resizeMode="contain"
                              />
                            )}
                            <View style={{ paddingLeft: 16 }}>
                              <Text style={styles.text()}>{menu.menu_name}</Text>
                              <Text style={styles.boldText()}>{menu.menu_price} ฿</Text>
                              <Text style={styles.text(COLORS.gray)}>{menu.menu_description}</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.emptyMenu}>
                            <Text style={styles.littleText(COLORS.gray)}>ยังไม่มีรายการอาหารในหมวดหมู่นี้</Text>
                          </View>
                        )}
                      </View>
                      ))}
                    </View>: <></>}
                  </View>
                  
                ))}
              </ScrollView>
            ) : (
              <View style={styles.center}>
                <View style={styles.forkiconbg(width * 0.24)}>
                  <Image
                    source={icons.fork}
                    style={styles.forkicon}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ margin: "2%" }} />
                <Text style={styles.text()}>ไม่มีเมนู</Text>
                <View style={{ margin: "1.5%" }} />
                <Text style={styles.littleText(COLORS.gray)}>ขณะนี้ร้านยังไม่มีตัวเลือกใด ๆ ที่จะแสดง</Text>
                <Text style={styles.littleText(COLORS.gray)}>เพิ่มตัวเลือกสำหรับรายการอาหารตอนนี้เลย</Text>
              </View>
            )
          )}
          <View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.button("45%")} onPress={() => handlebuttonPress("menutype")}>
                <Text style={styles.headerText()}>แก้ไขหมวดหมู่</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button("45%")} onPress={() => handlebuttonPress("editemenu")}>
                <Text style={styles.headerText()}>เพิ่มรายการอาหาร</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        : <View style={styles.container}>
          {addonLoading ? (
            <ActivityIndicator style={styles.loading} size={100} color={COLORS.primary} />
          ) : addonError ? (
            <Text>Something went wrong</Text>
          ) : (
            addonData && addonData.length > 0 ? (
              <ScrollView style={{ height: "100%" }}>
                {addonData.map((addon) => (
                  <View key={addon.addon_id} style={styles.subContainer}>
                    <TouchableOpacity
                      style={styles.nameContainer}
                      onPress={() => {clickedAddonIdHandler(addon.addon_id)}}
                    >
                      <Text style={styles.headerText()}>{addon.addon_name}</Text>                  
                      <Image
                        source={icons.rightArrow}
                        style={styles.rightArrow(clickedAddonId === addon.addon_id)}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    
                    {clickedAddonId === addon.addon_id ? <View >
                      <View style={styles.flexContainer}>
                        <TouchableOpacity>
                          <Text style={styles.littleText(COLORS.primary)}>รายการที่ใช้</Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 8 }}>|</Text>
                        <TouchableOpacity onPress={() => {handlebuttonPress("editeaddon",addon.addon_id)}}>
                          <Text style={styles.littleText(COLORS.primary)}>แก้ไขข้อมูล</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{padding:"0.5%"}}/>

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
                                onValueChange={() => toggleChoiceSwitch(choice.name,addon.addon_id)}
                              />
                            </View>
                          </View>
                        </View>
                      ))}
                    </View> : <></>}
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.center}>
                <View style={styles.forkiconbg(width * 0.24)}>
                  <Image source={icons.fork} style={styles.forkicon} resizeMode="cover" />
                </View>
                <View style={{ margin: "2%" }} />
                <Text style={styles.text()}>ไม่มีตัวเลือก</Text>
                <View style={{ margin: "1.5%" }} />
                <Text style={styles.littleText(COLORS.gray)}>
                  ขณะนี้ร้านยังไม่มีเมนูใด ๆ ที่จะแสดง
                </Text>
                <Text style={styles.littleText(COLORS.gray)}>เพิ่มรายการอาหารแรกของร้านเลย</Text>
              </View>
            )
          )}
          <View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.button("95%")} onPress={() => handlebuttonPress("editeaddon")}>
                <Text style={styles.headerText()} >เพิ่่มตัวเลือก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

export default Menuoption;
