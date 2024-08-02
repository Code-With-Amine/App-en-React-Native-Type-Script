import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { styles } from "../../style/StyleSheet";
import { ListItem } from "@rneui/themed";

type RootStackParamList = {
  PostDetail: { id: number; title: string };
};

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail: React.FC = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { id, title } = route.params;

  return (
    <SafeAreaView>
      <ListItem style={styles.postDetailsContainer}>
        <ListItem.Content >
          <ListItem.Title>ID de Post: {id}</ListItem.Title>
          <ListItem.Subtitle style={styles.postDetail}>Titre de Post: {title}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </SafeAreaView>
  );
};

export default PostDetail;
