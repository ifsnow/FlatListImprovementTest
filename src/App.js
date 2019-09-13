// @flow

import React, {PureComponent} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  FlatListNew,
} from 'react-native';

import Option from './Option';
import Stat from './Stat';

type Props = {};

type State = {
  isNewFlatlist: boolean,
  FlatListComponent: any,
  items: any[],
  onEndReachedThreshold: number,
  endReachedCount: number,
};

export default class App extends PureComponent<Props, State> {
  _listRef = React.createRef<any>();

  constructor(props: Props) {
    super(props);

    this.state = {
      isNewFlatlist: true,
      FlatListComponent: FlatListNew,
      items: this._makeNewItems(10),
      onEndReachedThreshold: 2,
      endReachedCount: 0,
    };
  }

  _keyExtractor = item => `list-${item.id}`;

  _renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  _makeNewItems = (count: number, reset: boolean = false) => {
    const {items = []} = this.state || {};
    const lastId =
      !reset && items.length > 0 ? items[items.length - 1].id + 1 : 1;

    const newItems = [];
    for (let id = lastId; id < lastId + count; id++) {
      newItems.push({
        id,
        title: `list - ${id}`,
      });
    }
    return newItems;
  };

  _onEndReached = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        endReachedCount: prevState.endReachedCount + 1,
        items: [].concat(...prevState.items, this._makeNewItems(10)),
      }));
    }, 200);
  };

  _onChangeFlatlist = (isNewFlatlist: boolean) => {
    this.setState(prevState => ({
      isNewFlatlist,
      FlatListComponent: isNewFlatlist ? FlatListNew : FlatList,
      items: this._makeNewItems(10, true),
      endReachedCount:
        prevState.isNewFlatlist !== isNewFlatlist
          ? 0
          : prevState.endReachedCount,
    }));
  };

  _onChangeThreshold = (threshold: number) => {
    this.setState(
      {
        onEndReachedThreshold: threshold,
      },
      () => {
        this._listRef.current &&
          this._listRef.current.scrollToIndex({
            index: 0,
            animated: false,
          });
      },
    );
  };

  render() {
    const {
      items,
      FlatListComponent,
      onEndReachedThreshold,
      isNewFlatlist,
      endReachedCount,
    } = this.state;

    return (
      <SafeAreaView>
        <Option
          isNewFlatlist={isNewFlatlist}
          threshold={onEndReachedThreshold}
          onChangeFlatlist={this._onChangeFlatlist}
          onChangeThreshold={this._onChangeThreshold}
        />
        <Stat endReachedCount={endReachedCount} itemLength={items.length} />
        <FlatListComponent
          ref={this._listRef}
          data={items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled
          pinchGestureEnabled={false}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
});
