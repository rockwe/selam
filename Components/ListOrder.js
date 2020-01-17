import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './ListOrderItem';

const renderItem = (item, type) => (
    <ListItem
        item={item}
        type={type}

    />
);



const List = ({
                  data,
                  type,
                  refreshing,
                  onRefresh,
              }) => (
    <FlatList
        data={data}
        removeClippedSubviews={true}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => index && item.user.toString()}
        renderItem={({ item }) =>
            renderItem(item, type)
        }
    />
);

export default List;
