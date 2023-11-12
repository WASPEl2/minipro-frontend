import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation,useRoute } from '@react-navigation/native'; 

import useFetch from "../../hook/useFetch";
import { COLORS, icons } from "../../constants";
import styles from "../menuoption/menuoption.style";
import { useRouter } from "expo-router";

const Menuoption = () => {
  const router = useRouter();
  const route = useRoute();
  const storeid = route.params.storeid;
  const navigation = useNavigation();

  const data = false;
  const isLoading = false;
  const error = false
  const { height, width } = Dimensions.get("window");

  const handlebuttonPress = (path) => {
    navigation.navigate(path,{
      storeid:storeid
    });
  };
  
  const [selectMenubar,SetSelectMenuBar] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.underline(selectMenubar ? COLORS.primary : '')}
          onPress={() => {SetSelectMenuBar(true)}}
        >
          <Text style={styles.headerText(selectMenubar ? COLORS.primary : '')}>เมนู</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.underline(selectMenubar ?  '' : COLORS.primary )}
          onPress={() => {SetSelectMenuBar(false)}}
        >
          <Text style={styles.headerText(selectMenubar ?  '' : COLORS.primary )}>ตัวเลือก</Text>
        </TouchableOpacity>
      </View>
      {selectMenubar ? 
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator style={styles.loading} size={100} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data && data.length > 0 ? (
              <ScrollView style={{height:"100%"}}>
                {data.map((item) => (
                  <TouchableOpacity 
                    key={item.menu_type_id} 
                    style={styles.itemContainer}
                    onPress={() => handlebuttonPress("editemenutype", item.menu_type_id)}
                  >
                    <Text style={styles.text()}>test</Text>
                  </TouchableOpacity>
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
                <Text style={styles.headerText()}>เพิ่มราการอาหาร</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :<View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator style={styles.loading} size={100} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data && data.length > 0 ? (
              <ScrollView style={{height:"100%"}}>
                {data.map((item) => (
                  <TouchableOpacity 
                    key={item.menu_type_id} 
                    style={styles.itemContainer}
                    onPress={() => handlebuttonPress("editemenutype", item.menu_type_id)}
                  >
                    <Text style={styles.text()}>test</Text>
                  </TouchableOpacity>
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
                <Text style={styles.littleText(COLORS.gray)}>ขณะนี้ร้านยังไม่มีเมนูใด ๆ ที่จะแสดง</Text>
                <Text style={styles.littleText(COLORS.gray)}>เพิ่มรายการอาหารแรกของร้านเลย</Text>

              </View>
            )
          )}
          <View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.button("95%")} onPress={() => handlebuttonPress("editeaddon")}>
                <Text style={styles.headerText()} >เพิ่มตัวเลือก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

export default Menuoption;
