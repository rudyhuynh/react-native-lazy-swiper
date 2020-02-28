
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, Dimensions } from 'react-native'

const LazySwiper = ({ currentIndex, data, width, renderItem, onSwipeEnd } ) => {
  const scrollView = useRef()
  const [scrolling, setScrolling] = useState(false)

  const setScrollingTrue = () => {
    setScrolling(true)
  }

  const swipeNext = () => {
    if (currentIndex >= data.length - 1 || scrolling) return
    setScrolling(true)

    scrollView.scrollTo({
      x: width * (currentIndex > 0 ? 2 : 1),
      animated: true,
    })
  }

  const swipeBack = () => {
    if (currentIndex <= 0 || scrolling) return
    setScrolling(true)
    scrollView.scrollTo({
      x: 0,
      animated: true,
    })
  }

  const _renderItem = (index) => { 
    if (index < 0 || index >= data.length) return
  
    return (
      <View style={{ width }} key={index}>
        {renderItem(data[index], index)}
      </View>
    )
  }

  const _onSwipeEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    let nextIndex
  
    if (
      parseInt(contentOffsetX) === parseInt(width * 2) ||
      (parseInt(contentOffsetX) == parseInt(width) && currentIndex === 0)
    ) {
      nextIndex = currentIndex - 1
    } else {
      nextIndex = currentIndex + 1
    }
  
    // scroll to the beginning
    if (contentOffsetX === 0 && currentIndex === 0) return
  
    // scroll left
    if (contentOffsetX === 0) {
      nextIndex = (currentIndex ? currentIndex : 0) - 1
    } else {
      // scroll right
      if (
        parseInt(contentOffsetX) === parseInt(width * 2) ||
        (parseInt(contentOffsetX) == parseInt(width) && currentIndex === 0)
      ) {
        // scroll to last item
        if (currentIndex === data.length) return
        nextIndex = currentIndex + 1
      } else {
        return
      }
    }
  
    setScrolling(false)
    onSwipeEnd(nextIndex, () => {
      if (nextIndex !== 0) {
        _scrollView.scrollTo({ x: width, animated: false })
      }
    })
  }

    return (
      <ScrollView
        ref={scrollView}
        onScroll={setScrollingTrue}
        pagingEnabled={true}
        contentOffset={{ x: currentIndex === 0 ? 0 : width, y: 0 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="center"
        onMomentumScrollEnd={_onSwipeEnd}
      >
        {_renderItem(currentIndex - 1)}
        {_renderItem(currentIndex)}
        {_renderItem(currentIndex + 1)}
      </ScrollView>
    )
}


LazySwiper.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  onSwipeEnd: PropTypes.func.isRequired,
}
LazySwiper.defaultProps = {
  width: Dimensions.get('window').width,
}

export default LazySwiper
