# React Native Lazy Swiper
A swiper for React Native (0.26+) with lazy-loaded contents (3 at a time).
This component is currently support for iOS. It still runs on Android but without swipe feature.

## Installation
`npm install react-native-lazy-swiper --save`

## Usage
* Define onSwipeEnd props: in this function, set nextIndex of component's state to currentIndex prop then pass the rerender callback function to setState method as second argument.
* Define renderItem props: use this function to render each content for the swiper
* [Optional] Define width for child views. Default width is screen width.
* To swipe next manually: lazySwiper.swipeNext()
* To swipe back manually: lazySwiper.swipeBack()
* To go to specific item (no animation supported): set currentIndex of component's state to specific index.

## Example:
````
[...]
import LazySwiper from 'react-native-lazy-swiper'

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentIndex: 0,
			data: []}
	}
	componentDidMount(){
		//Fetch data array
		fetch(...).done((result) => {
			this.setState({data: result})
		})
	}
	onSwipeEnd(nextIndex, rerender){
		this.setState({
			currentIndex: nextIndex
		}, rerender)
	}
	/**
	 * 	Bind this to previous button to manually swipe to the previous content.
	 *	This should work on Android but without animation
	 */
	prevQuestion(){
        this._lazySwiper.swipeBack()
    }
    /**
     *	Manually go to a specific content by reset new currentIndex to component's state
     */
    goToQuestion(index){
        this.setState({
            currentIndex: index
        })
    }
    /**
     *	Bind this to next button to manually swipe to the next content.
     *	This should work on Android but without animation
     */
    nextQuestion(){
        this._lazySwiper.swipeNext()
    }
    /**
     *	Render each content of the Swiper for each item in data array.
     */
    renderItem(item, index){
		return <View>
			<Text>No {index}: {item.name}</Text>
		</View>
	}
	render(){
		const {currentIndex, data} = this.state
		return <Swiper 
			ref={(lazySwiper) => this._lazySwiper = lazySwiper} 
		    currentIndex={currentIndex}
		    data={data}
		    renderItem={(item, index) => this.renderItem(item, index)}
		    onSwipeEnd={(nextIndex, rerender) => this.onSwipeEnd(nextIndex, rerender)}/>
	}
}

````
## LICENSE
MIT