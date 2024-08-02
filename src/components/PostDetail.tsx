import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  PostDetail: { id: number; title: string };
};

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail: React.FC = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post ID: {id}</Text>
      <Text style={styles.title}>Post Title: {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostDetail;
