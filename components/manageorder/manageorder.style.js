import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  underline: (color) => ({
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: color ? color : COLORS.gray,
    padding: 10,
  }),
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  headerText: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  boldHeaderText: (color) => ({
    fontFamily: FONT.bold,
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
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    paddingVertical: 12,
  },
  button: (h) => ({
    width: h,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  }),
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderContainer: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingLeft: "4%",
    paddingRight: "8%",
    paddingVertical: "2%",
  },
  orderHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkList: {
    marginRight: "2%",
    marginTop: "2%",
  },
  pendingCount: {
    height: 20,
    width: 20,
    fontFamily: FONT.bold,
    fontSize: 14,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    padding: 2,
    borderRadius: 10,
    marginRight: 4,
  },
});

export default styles;
