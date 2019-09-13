// @flow

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Props = {
  endReachedCount: number,
  itemLength: number,
};

const Option = React.memo<Props>(({endReachedCount, itemLength}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.label}>onEndReached : </Text>
        <Text style={styles.value}>{endReachedCount}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Items : </Text>
        <Text style={styles.value}>{itemLength}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ff6622',
  },
});

export default Option;
