import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, FONT } from "../constants";
import Menuoption from "../components/menuoption/menuoption";

const menu_option = () => {
  return (
    <SafeAreaView
      style={{
        flex: 2,
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "เมนู/ตัวเลือก",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerShown: true,
        }}
      />

      <Menuoption />
    </SafeAreaView>
  );
};

export default menu_option;
