import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../style/StyleSheet";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  selectPostById,
  getItemsStatus,
  getItemsError,
} from "../slices/postsSlice";
import { AppDispatch } from "../store/store";

type RootStackParamList = {
  PostDetail: { id: number };
};

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail: React.FC = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector(selectPostById);
  const status = useSelector(getItemsStatus);
  const error = useSelector(getItemsError);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      {post ? (
        <ListItem style={styles.postDetailsContainer}>
          <ListItem.Content>
            <ListItem.Title>ID de Post: {post.id}</ListItem.Title>
            <ListItem.Subtitle style={styles.postDetail}>
              Titre de Post: {post.title}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
        <Text>No post found.</Text>
      )}
    </SafeAreaView>
  );
};

export default PostDetail;
