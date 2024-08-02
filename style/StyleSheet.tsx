import { StyleSheet } from "react-native";
import PostDetail from "../src/components/PostDetail";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  postDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  postDetail: {
    paddingTop: 16,
  },
});
