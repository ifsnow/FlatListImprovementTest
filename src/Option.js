// @flow

import React, {useCallback} from 'react';
import {Text, View, Switch, StyleSheet, TouchableOpacity} from 'react-native';

type ChoiceButtonProps = {
  threshold: number,
  value: number,
  onPress: (threshold: number) => void,
};

const ChoiceButton = ({threshold, value, onPress}: ChoiceButtonProps) => {
  const onPressCallback = useCallback(() => {
    onPress(value);
  }, [onPress, value]);

  return (
    <TouchableOpacity style={styles.choice} onPress={onPressCallback}>
      <Text
        style={[
          styles.choiceText,
          threshold === value && styles.choiceTextIsSelected,
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

type OptionProps = {
  isNewFlatlist: boolean,
  threshold: number,
  onChangeFlatlist: (isNewFlatlist: boolean) => void,
  onChangeThreshold: (threshold: number) => void,
};

const Option = React.memo<OptionProps>(
  ({
    isNewFlatlist,
    threshold,
    onChangeFlatlist,
    onChangeThreshold,
  }: OptionProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.col}>
          <Text style={styles.text}>Patched FlatList</Text>
          <Switch onValueChange={onChangeFlatlist} value={isNewFlatlist} />
        </View>
        <View style={styles.col}>
          <Text style={styles.text}>Threshold :</Text>
          <View style={styles.col}>
            <ChoiceButton
              threshold={threshold}
              value={0.5}
              onPress={onChangeThreshold}
            />
            <ChoiceButton
              threshold={threshold}
              value={1}
              onPress={onChangeThreshold}
            />
            <ChoiceButton
              threshold={threshold}
              value={2}
              onPress={onChangeThreshold}
            />
          </View>
        </View>
      </View>
    );
  },
);

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
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  choice: {
    minWidth: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceText: {
    color: '#888',
    fontSize: 14,
    marginRight: 10,
  },
  choiceTextIsSelected: {
    fontWeight: 'bold',
    color: '#ff6600',
  },
});

export default Option;
