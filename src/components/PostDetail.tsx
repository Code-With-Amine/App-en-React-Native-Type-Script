import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { styles } from "../../style/StyleSheet";

type RootStackParamList = {
  PostDetail: { id: number; title: string };
};

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail: React.FC = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { id, title } = route.params;

  return (
    <View style={styles.postDetailsContainer}>
      <Text style={styles.title}>ID de Post: {id}</Text>
      <Text style={styles.title}>Titre de Post: {title}</Text>
    </View>
  );
};

export default PostDetail;
