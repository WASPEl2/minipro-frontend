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
  text: (color) => ({
    fontFamily: FONT.regular,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  ExtraSmallText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.gray,
  },
  headerText: (color) => ({
    fontFamily: FONT.bold,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),

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
  button: (h) => ({
    width: h,
    height: 36,
    borderRadius: 10,
    marginVertical: 12,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  }),
  deleteContainer: {
    flexDirection: "row",
    height: 32,
    width: "35%",
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
});

export default styles;
