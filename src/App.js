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
import Action from './Action';
import ItemButton from './ItemButton';

type Props = {};

export type ItemSizeType = 'NONE' | 'SMALL' | 'LARGE';

type ItemType = {
  id: number,
  title: string,
  size: ItemSizeType,
};

type State = {
  isNewFlatlist: boolean,
  FlatListComponent: any,
  items: ItemType[],
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
      items: this._makeNewItems(20),
      onEndReachedThreshold: 2,
      endReachedCount: 0,
    };
  }

  _keyExtractor = item => `list-${item.id}`;

  _renderItem = ({item}) => (
    <View
      style={[
        styles.item,
        item.size === 'SMALL' && styles.itemIsSmall,
        item.size === 'LARGE' && styles.itemIsLarge,
      ]}>
      <View style={styles.itemTitle}>
        <Text>{item.title}</Text>
      </View>
      <View style={styles.itemButtons}>
        <ItemButton
          id={item.id}
          size="SMALL"
          onPress={this._onChangeItemSize}
        />
        <ItemButton
          id={item.id}
          size="LARGE"
          onPress={this._onChangeItemSize}
        />
      </View>
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
        size: 'NONE',
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
      items: this._makeNewItems(20, true),
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

  _onChangeItemSize = (id: number, size: ItemSizeType) => {
    const items = this.state.items.map(item => ({
      ...item,
      size: id === item.id ? size : item.size,
    }));

    this.setState({
      items: [...items],
    });
  };

  _onPressChangeAllSmall = () => this._changeItemsSize('SMALL');

  _onPressChangeAllLarge = () => this._changeItemsSize('LARGE');

  _changeItemsSize = (size: ItemSizeType) => {
    const items = this.state.items.map(item => ({
      ...item,
      size,
    }));

    this.setState({
      items: [...items],
    });
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
        <Action
          onPressChangeAllSmall={this._onPressChangeAllSmall}
          onPressChangeAllLarge={this._onPressChangeAllLarge}
        />
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
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    paddingHorizontal: 16,
  },
  itemIsSmall: {
    height: 50,
  },
  itemIsLarge: {
    height: 200,
  },
  itemTitle: {
    flex: 1,
  },
  itemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 100,
  },
});
