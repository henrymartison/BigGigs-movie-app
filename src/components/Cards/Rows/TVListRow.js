import React from "react";
import { FlatList } from "react-native";

const MovieListRow = ({
  data,
  type,
  isSearch,
  keyGrid,
  numColumns,
  refreshing,
  onRefresh,
  ListFooterComponent,
  ListEmptyComponent,
  ListHeaderComponent,
  navigate,
  renderItem,
}) => (
  <FlatList
    {...{
      ListHeaderComponent,
      ListFooterComponent,
      ListEmptyComponent,
      numColumns,
      data,
      refreshing,
      onRefresh,
    }}
    key={keyGrid}
    removeClippedSubviews
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) =>
      renderItem(item, type, isSearch, numColumns, navigate)
    }
  />
);

export default MovieListRow;
