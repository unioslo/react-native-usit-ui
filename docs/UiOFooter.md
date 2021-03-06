# UiOFooter

### Usage

```js
...
import { Alert, View } from 'react-native';
import { UiOFooter } from 'react-native-usit-ui';

...
  render() {
    return (
     <View>
      <UiOFooter
        onPress={() =>
          Alert.alert('Reset', 'Would you like to reset all data?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Reset', onPress: () => console.log('reset') },
            ]
          )
        }/>
    </View>
    )
  }
```

### API

| Prop                      | Default |     Type     | Description                                                              |
| :------------------------ | :------ | :----------: | :----------------------------------------------------------------------- |
| onPress                   | `null`  | `() => void` | The function to be called when X amount is clicked on footer             |
| numberOfTriesBeforeAction | `7`     |   `number`   | The number of times clicked before onPress is triggered                  |
| touchInterval             | `0.5`   |   `number`   | Time span of which the touches must be in for the action to be triggered |
