import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONT, icons } from '../../../../constants';

const RectangleCheckBox = ({ checked, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      {checked ? <Image source={icons.tick2} style={styles.checked} resizeMode="contain" />:<View style={styles.nonchecked} /> }
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text:{
    fontFamily: FONT.regular
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checked: {
    width: 15, 
    height: 15,
    marginRight: 5, 
    borderRadius: 2, 
    backgroundColor: COLORS.primary
  },
  nonchecked: {
    width: 15, 
    height: 15,
    borderRadius: 2, 
    borderWidth: 1, 
    borderColor: COLORS.gray, 
    marginRight: 5, 
  },
});

export default RectangleCheckBox;
