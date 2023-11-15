import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: "2.4%",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  scrollViewContainer: {
    paddingHorizontal: "4%",
  },
  foodImage: (size) => ({
    width: size,
    height: size,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
  }),
  headerText: (color) => ({
    fontFamily: FONT.bold,
    fontSize: 16,
    color: color ? color : COLORS.black,
  }),
  miniHeaderText: (color) => ({
    fontFamily: FONT.bold,
    fontSize: 14,
    color: color ? color : COLORS.black,
  }),
  text: (color) => ({
    fontFamily: FONT.regular,
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
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  button: (h, color) => ({
    width: h,
    height: 36,
    borderRadius: 10,
    marginVertical: 12,
    backgroundColor: color ? color : COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  }),
  imageContainer: {
    margin: "6%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageTextContainer: {
    justifyContent: "center",
  },
  editeContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.lightGray,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  camera: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  priceInputContainer: {
    width: "35%",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectContainer: {
    marginVertical: "3.2%",
    paddingTop: "1.6%",

    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  deleteContainer: {
    flexDirection: "row",
    height: 32,
    width: "35%",
    marginVertical: "3%",
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
