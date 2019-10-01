// @flow

import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

type Props = {
  onPressChangeAllSmall: () => void,
  onPressChangeAllLarge: () => void,
};

const Action = React.memo<Props>(
  ({onPressChangeAllSmall, onPressChangeAllLarge}: Props) => {
    return (
      <View style={styles.container}>
        <Button title="Change all small" onPress={onPressChangeAllSmall} />
        <Text>&nbsp;|&nbsp;</Text>
        <Button title="Change all large" onPress={onPressChangeAllLarge} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 3,
  },
});

export default Action;
