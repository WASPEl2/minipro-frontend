import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, FONT } from "../constants";
import ManageOrder from "../components/manageorder/manageorder";

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
          headerTitle: "รายการอาหารวันนี้",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerShown: true,
        }}
      />

      <ManageOrder />
    </SafeAreaView>
  );
};

export default menu_option;
