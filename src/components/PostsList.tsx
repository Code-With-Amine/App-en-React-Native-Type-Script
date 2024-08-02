import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectAllItems,
  getItemsStatus,
  getItemsError,
} from "../slices/postsSlice";
import { AppDispatch } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../style/StyleSheet";

const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const items = useSelector(selectAllItems);
  const status = useSelector(getItemsStatus);
  const error = useSelector(getItemsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  const handlePress = (id: number) => {
    navigation.navigate("PostDetail", { id });
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <SafeAreaView>
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      )}
    />
  );
};

export default PostsList;
