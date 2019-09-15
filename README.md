This is for https://github.com/facebook/react-native/pull/26444

-----------

This project is to test the improvement of `onEndReached` feature of FlatList.

1. The list has 10 items at the beginning.
2. When `onEndReached` is called, 10 items are added.

# After the initial rendering
### # Current FlatList

![Current FlatList initial rendering](screenshots/old_flatlist_initial_renering.png)

`OnEndReached` is called twice and has 30 items.

### # Patched FlatList

![Patched FlatList initial rendering](screenshots/patched_flatlist_initial_renering.png)

`OnEndReached` is not called and has 10 items.

# After scrolling to the 11th item
### # Current FlatList

![Current FlatList scrolling](screenshots/old_flatlist_scrolling.png)

`OnEndReached` is called twice, having 50 items.

### # Patched FlatList

![Patched FlatList scrolling](screenshots/patched_flatlist_scrolling.png)

`OnEndReached` is called twice, having 30 items.
