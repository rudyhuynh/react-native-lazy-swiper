import React, {PropTypes} from 'react'
import {View,Text,/* ScrollView,*/ Dimensions, ViewPagerAndroid, StyleSheet} from 'react-native'

/**
 *  A swiper for Android (Under development)
 *  Warning: This module is just a polyfill to make Swiper component work on android. Swipe feature's still not worked yet.
 */

class LazySwiper extends React.Component{
    constructor(props){
        super(props)
        this._scrolling = false
    }
    // _shouldComponentUpdate(nextProps){
    //     let shouldUpdate = false;
    //     /**
    //      * Prevent rerender when only currentIndex is changed
    //      */
    //     for (let i in Swiper.propTypes){
    //         if (i != 'currentIndex'){
    //             if (nextProps[i] != this.props[i]) shouldUpdate = true
    //         }
    //     }
    //     return shouldUpdate
    // }
    // _componentWillReceiveProps(nextProps){
    //     let {currentIndex} = this.props
    //     let {nextCurrentIndex} = nextProps
    //     if (nextCurrentIndex && currentIndex && nextCurrentIndex != currentIndex){
    //         this._viewPager.setPage(nextCurrentIndex)
    //     }
    // }
    swipeNext(){
        const {currentIndex, data} = this.props;
        if (currentIndex >= data.length-1 || this._scrolling) return

        _onSwipeEnd.bind(this)({nativeEvent: {position: currentIndex+1}})
        return

        // this._scrolling = true
        // this._viewPager.setPage(currentIndex+1)
    }
    swipeBack(){
        const {currentIndex} = this.props;
        if (currentIndex <= 0 || this._scrolling) return

        _onSwipeEnd.bind(this)({nativeEvent: {position: currentIndex-1}})
        return

        // this._scrolling = true
        // this._viewPager.setPage(currentIndex-1)
    }
    render(){
        const {currentIndex} = this.props
        return <View style={styles.base}>
            {_renderItem.bind(this)(currentIndex)}
        </View>
        /**return <ViewPagerAndroid
            onPageScroll={() => this._scrolling = true}
            onPageSelected={_onSwipeEnd.bind(this)}
            style={styles.base}
            initialPage={currentIndex === 0 ? 0 : 1}
            ref={viewPager => this._viewPager = viewPager}>
            {_renderItem.bind(this)(currentIndex-1)}
            {_renderItem.bind(this)(currentIndex)}
            {_renderItem.bind(this)(currentIndex+1)}
        </ViewPagerAndroid>
        /**
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
        **/
    }
}

/** Private methods **/

function _renderItem(index){
    let {data, renderItem, width} = this.props
    if (index<0 || index >= data.length) return

    return <View key={index} style={{width}}>
        {renderItem(data[index], index)}
    </View>
}

function _onSwipeEnd(e){
    let {onSwipeEnd, currentIndex, data, width} = this.props;
    const nextIndex = e.nativeEvent.position

    this._scrolling = false
    onSwipeEnd(nextIndex, () => {
        //this._viewPager.setPageWithoutAnimation(nextIndex)
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
    width: Dimensions.get('window').width,
    currentIndex: 0
}

const styles = StyleSheet.create({
    base: {
        flex: 1
    }
})

export default LazySwiper