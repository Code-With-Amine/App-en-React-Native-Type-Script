import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  selectAllItems,
  getItemsStatus,
  getItemsError,
} from "../slices/itemsSlice";
import { AppDispatch } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../style/StyleSheet";

const ItemsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const items = useSelector(selectAllItems);
  const status = useSelector(getItemsStatus);
  const error = useSelector(getItemsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  const handlePress = (id: number, title: string) => {
    navigation.navigate("PostDetail", { id, title });
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id, item.title)}>
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ItemsList;
