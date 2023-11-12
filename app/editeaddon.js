import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, FONT } from "../constants";
import EditeAddon from "../components/editeaddon/editeaddon";

const addon = (text) => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "จัดการตัวเลือกอาหาร",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerShown: true,
        }}
      />
      <EditeAddon />
    </SafeAreaView>
  );
};

export default addon;
