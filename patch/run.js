const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '../');

// VirtualizedListNew.js
fs.copyFileSync(
  `${rootPath}/patch/VirtualizedListNew.js`,
  `${rootPath}/node_modules/react-native/Libraries/Lists/VirtualizedListNew.js`,
);

console.log('# Created : VirtualizedListNew.js');

// FlatListNew.js
const flatList = fs.readFileSync(
  `${rootPath}/node_modules/react-native/Libraries/Lists/FlatList.js`,
  'UTF-8',
);

const flatListNew = flatList.replace(
  /'\.\/VirtualizedList'/g,
  "'./VirtualizedListNew'",
);

fs.writeFileSync(
  `${rootPath}/node_modules/react-native/Libraries/Lists/FlatListNew.js`,
  flatListNew,
);

console.log('# Created : FlatListNew.js');

// react-native-implementation.js
const implementation = fs.readFileSync(
  `${rootPath}/node_modules/react-native/Libraries/react-native/react-native-implementation.js`,
  'UTF-8',
);

if (implementation.indexOf('FlatListNew') === -1) {
  const implementationNew = implementation.replace(
    'get FlatList() {',
    `get FlatListNew() {
    return require('FlatListNew');
  },
  get FlatList() {`,
  );

  fs.writeFileSync(
    `${rootPath}/node_modules/react-native/Libraries/react-native/react-native-implementation.js`,
    implementationNew,
  );

  console.log('# Modified : react-native-implementation.js');
}
