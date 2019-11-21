import React from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { fsr } from '../../commons/metrics';
import { white } from '../../../styles/Colors';

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
  navigate,
  renderItem,
  filterName,
  filterTitle
}) => (
  <View>
    <View
      style={{
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginTop: 10
      }}
    >
      <Text
        style={{
          fontSize: fsr(3),
          fontWeight: 'bold',
          color: white,
          width: '80%'
        }}
        numberOfLines={1}
      >
        {filterName}
      </Text>
    </View>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      // key={keyGrid}
      numColumns={numColumns}
      removeClippedSubviews
      keyExtractor={item => item.id.toString()}
      refreshing={refreshing}
      onRefresh={onRefresh}
      // ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) =>
        renderItem(item, type, isSearch, numColumns, navigate, filterTitle)
      }
    />
  </View>
);

export default MovieListRow;
