This is for https://github.com/facebook/react-native/pull/26444

-----------

This project is to test the improvement of `onEndReached` feature of FlatList.

1. The list has 20 items at the beginning.
2. When `onEndReached` is called, 10 items are added.

# After the initial rendering
### # Current FlatList

![Current FlatList initial rendering](screenshots/old_flatlist_initial_renering.png?v=2)

`OnEndReached` is called and has 30 items.

### # Patched FlatList

![Patched FlatList initial rendering](screenshots/patched_flatlist_initial_renering.png?v=2)

`OnEndReached` is not called and has 20 items.

# After scrolling to the 11th item
### # Current FlatList

![Current FlatList scrolling](screenshots/old_flatlist_scrolling.png?v=2)

`OnEndReached` is called twice in a short period, having 50 items.

### # Patched FlatList

![Patched FlatList scrolling](screenshots/patched_flatlist_scrolling.png?v=2)

`OnEndReached` is called, having 30 items.
