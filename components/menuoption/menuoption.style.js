import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 2,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  underline: (color) => ({
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: color ? color : COLORS.gray,
    padding: 10,
  }),
  headerContainer: {
    flexDirection: "row",
    width: "100%",
  },
  headerText: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  text: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 14,
    color: color ? color : COLORS.black,
  }),
  boldText: (color) => ({
    fontFamily: FONT.bold,
    fontSize: 14,
    color: color ? color : COLORS.black,
  }),
  littleText: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 12,
    color: color ? color : COLORS.black,
  }),
  subContainer: {
    borderBottomWidth: 4,
    borderColor: COLORS.lightGray,
    paddingHorizontal: "6%",
  },
  nameContainer: {
    paddingVertical: "3.6%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  button: (h) => ({
    width: h,
    height: 36,
    borderRadius: 10,
    marginVertical: 12,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  }),
  loading: {
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  center: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  forkiconbg: (w) => ({
    height: w,
    width: w,
    borderRadius: 1000,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  }),
  forkicon: {
    height: "75%",
    width: "75%",
  },
  rightArrow: (clicked) => ({
    height: 20,
    width: 20,
    transform: [{ rotate: clicked ? "270deg" : "90deg" }],
  }),
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  choiceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.lightGray,
    borderTopWidth: 0.5,
  },
  menuImage: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "1.2%",
    borderColor: COLORS.lightGray,
    borderTopWidth: 0.5,
  },
  emptyMenu: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "2.4%",
  },
});

export default styles;
