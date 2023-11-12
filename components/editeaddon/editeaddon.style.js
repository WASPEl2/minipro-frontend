import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: "2.4%",
    paddingTop: "2.4%",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  underline: (color) => ({
    padding: "4%",
    borderBottomWidth: 1,
    borderColor: color ? color : COLORS.gray,
  }),
  headerText: (color) => ({
    fontFamily: FONT.bold,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  text: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  SmallText: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 14,
    color: color ? color : COLORS.black,
  }),
  ExtraSmallText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.gray,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 8,
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
  button: (h, color) => ({
    width: h,
    height: 32,
    borderRadius: 10,
    marginVertical: 12,
    backgroundColor: color ? color : COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  }),
  deleteContainer: {
    flexDirection: "row",
    height: 32,
    width: "30%",
    marginTop: "3%",
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  trashBin: {
    width: 16,
    height: 16,
  },
  choice: {
    paddingTop: "4%",
  },
  choiceItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 12,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backContainerChoice: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIconContainer: {
    marginLeft: 12,
    paddingLeft: 12,
    borderColor: COLORS.lightGray,
    borderLeftWidth: 1,
  },
  deleteIcon: {
    width: 16,
    height: 16,
  },
});

export default styles;
