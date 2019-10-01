// @flow

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {type ItemSizeType} from './App';

type Props = {
  id: number,
  size: ItemSizeType,
  onPress: (id: number, size: ItemSizeType) => void,
};

const ItemButton = React.memo<Props>(({id, size, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id, size)}>
      <Text style={styles.text}>{size}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 13,
    color: '#ff6622',
  },
});

export default ItemButton;
