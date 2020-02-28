# React Native Lazy Swiper
Another swiper for React Native with lazy-loaded contents.

## Installation
`npm install another-react-native-lazy-swiper --save`

## Usage
* Define `onSwipeEnd` props: in this function, set nextIndex of component's state to currentIndex prop then pass the rerender callback function to setState method as second argument.
* Define `renderItem` props: use this function to render each content for the swiper
* [Optional] Define `width` for child views. Default width is screen width.
* To swipe next manually: `lazySwiper.swipeNext()`
* To swipe back manually: `lazySwiper.swipeBack()`
* To go to specific item (no animation supported): set `currentIndex` of component's state to specific index.

## Example:
````
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import LazySwiper from 'another-react-native-lazy-swiper'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const screenwidth = Dimensions.get('window').width

const MySwiper = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(index)
  const _lazySwiper = useRef()

  const prev = () => {
    _lazySwiper.swipeBack()
  }

  const goTo = index => {
    setCurrentIndex(index)
  }

  const next = () => {
    _lazySwiper.swipeNext()
  }

  const onSwipeEnd = (nextIndex, rerender) => {
    rerender()
    setCurrentIndex(nextIndex)
  }

  const renderItem = item => {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{item}</Text>
      </SafeAreaView>
    )
  }

  return (
    <LazySwiper
      currentIndex={currentIndex}
      data={data}
      width={screenwidth}
      renderItem={renderItem}
      ref={_lazySwiper}
      onSwipeEnd={onSwipeEnd}
    />
  )
}

export default MySwiper


````

## Props
* `currentIndex`: (number, isRequired) to set specific displayed content of the swiper.
* `data`: (array, isRequired) list of items to show swiper contents.
* `renderItem`: (function(item, index), isRequired) to render each swiper content. Parameters:
  * `item`: item of `data` array
  * `index`: index of the item in `data` array
* `onSwipeEnd`: (function(nextIndex, rerender), isRequired) to set to new currentIndex and rerender the swiper. Define this will help the swiper render new content and swipe out unnessessary content. Parameters:
  * `nextIndex`: (number) set this to currentIndex of the state of the component which render the swiper.
  * `rerender`: (function()) pass this to `setState` method from above as second argument (sorry for this mysterious callback function but I found no other way).

## LICENSE
MIT
