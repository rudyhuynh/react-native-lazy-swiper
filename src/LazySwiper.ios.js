import React, {PropTypes} from 'react'
import {View, ScrollView, Dimensions} from 'react-native'

/**
 *  A swiper for iOS
 *  Usage:
 *  - Define onSwipeEnd props: set nextIndex to currentIndex prop then call the callback function.
 *  - Define renderItem props: return item React element depend on item of index
 *  - [Optional] Define width for child views. Default width is screen width.
 *  - To swipe next manually: swiper.swipeNext()
 *  - To swipe back manually: swiper.swipeBack()
 *  - To go to specific item (no animation supported): reset currentIndex prop
 */

class LazySwiper extends React.Component{
    constructor(props){
        super(props)
        this._scrolling = false
    }
    swipeNext(){
        const {currentIndex, data, width} = this.props;
        if (currentIndex >= data.length-1 || this._scrolling) return

        this._scrolling = true
        this._scrollView.scrollTo({
            x: width*( currentIndex > 0 ? 2 : 1), 
            animated: true
        })
    }
    swipeBack(){
        const {currentIndex} = this.props;
        if (currentIndex <= 0 || this._scrolling) return

        this._scrolling = true
        this._scrollView.scrollTo({
            x: 0, 
            animated: true
        })
    }
    render(){
        const {currentIndex, width} = this.props;

        return <ScrollView
            ref={sv => this._scrollView = sv}
            onScroll={() => this._scrolling = true}
            pagingEnabled={true}
            contentOffset={{x: currentIndex === 0 ? 0 : width, y: 0}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            snapToAlignment="center"
            onMomentumScrollEnd={_onSwipeEnd.bind(this)}>
            {_renderItem.bind(this)(currentIndex-1)}
            {_renderItem.bind(this)(currentIndex)}
            {_renderItem.bind(this)(currentIndex+1)}
        </ScrollView>
    }
}

/** Private methods **/

function _renderItem(index){
    let {data, renderItem, width} = this.props

    if (index<0 || index >= data.length) return

    return <View style={{width}}>
        {renderItem(data[index], index)}
    </View>
}

function _onSwipeEnd(e){
    let {onSwipeEnd, currentIndex, data, width} = this.props;
    const contentOffsetX = e.nativeEvent.contentOffset.x
    let nextIndex

    if (contentOffsetX === 0){
        //scroll to the left
        if (currentIndex === 0) return
        nextIndex = currentIndex - 1
    }else if (contentOffsetX === width*2 || 
        (contentOffsetX == width && currentIndex === 0)){
        //scroll to the right
        if (currentIndex === data.length) return
        nextIndex = currentIndex + 1
    }

    this._scrolling = false
    onSwipeEnd(nextIndex, () => {
        if (nextIndex != 0){
            this._scrollView.scrollTo({x: width, animated: false})    
        }
    })
}

/** End private methods **/

LazySwiper.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired, 
    width: PropTypes.number.isRequired,
    /**
     *  function renderItem(item, index)
     */
    renderItem: PropTypes.func.isRequired,
    /**
     *  function onSwipeEnd(nextIndex, callback)
     *      nexIndex: the index to reset currentIndex prop.
     *      callback: just call this after reset currentIndexProp
     */
    onSwipeEnd: PropTypes.func.isRequired
}
LazySwiper.defaultProps = {
    width: Dimensions.get('window').width
}

export default LazySwiper