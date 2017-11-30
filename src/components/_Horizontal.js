/* global fetch:false */
/*eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }]*/
import React, { PureComponent } from 'react';
import {
	View,
	Text,
	ImageBackground,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Animated
} from 'react-native';
import { connect } from 'react-redux';
import Animation from 'lottie-react-native';

import CardUI from './_HorizontalCard';

import { callWebservice, mutateData } from '../actions/apiActions';

import TwitterHeart from '../animations/TwitterHeart.json';

const cardHeight = 300;
const cardWidth = 200;
const colorFollow = 'royalblue';

class Horizontal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			progress: new Animated.Value(0)
		};
		this.page = 1;
	}

	componentDidMount() {
		this.makeAPIRequest();
	}

	onEndReached = () => {
		if (!this.props.apiBundle.isEndList) {
			this.makeAPIRequest();
		}
	};

	getItemLayout = (data, index) => ({ length: cardHeight, offset: cardHeight * index, index });

	setAnim = anim => (this.anim = anim);

	finishedAnim = () => {
		this.state.progress.setValue(0);
		Animated.timing(this.state.progress, {
			toValue: 1,
			duration: 1000
		}).start(({ finished }) => {
			if (finished) {
				this.isShowingAnimation = false;
				if (!this.props.apiBundle.isEndList) {
					this.makeAPIRequest();
				}
			}
		});
	};

	makeAPIRequest = () => {
		const { propUrl, propObj } = this.props;

		const headerObject = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Cache-Control': 'default'
		};

		const API_ENDPOINT = propUrl;
		const API_OBJECT = {
			method: 'POST',
			headers: headerObject,
			body: JSON.stringify({
				CategoryID: propObj.CategoryID,
				CategoryTypeID: propObj.CategoryTypeID,
				ProfileID: '1081',
				Page: this.page,
				Size: '5',
				Languages: ['en'],
				isMicroApp: false,
				MicroAppProfileID: null
			})
		};
		this.props.callService(API_ENDPOINT, API_OBJECT);

		this.page += 1;
	};

	flipFollow = rowItem => {
		this.props.mutateData(this.props.apiBundle.data, rowItem);
	};

	buttonFollow = rowItem => {
		const { canRepost } = rowItem.item;
		const follow = canRepost;

		const textFollow = follow ? 'Following' : 'Follow';

		return (
			<TouchableOpacity
				onPress={() => this.flipFollow(rowItem)}
				style={follow ? styles.onFollow : styles.notFollow}
			>
				<Text
					style={
						follow
							? { fontSize: 11, color: 'white', fontWeight: 'bold' }
							: { fontSize: 11, color: colorFollow }
					}
				>
					{' '}
					{textFollow}{' '}
				</Text>
			</TouchableOpacity>
		);
	};

	renderFooterEnd = () => {
		const animationSection = (
			<View
				style={{
					height: cardHeight,
					width: cardWidth
				}}
			>
				<Animation
					ref={this.setAnim}
					style={{
						height: 200,
						width: cardWidth,
						marginTop: 20
					}}
					source={TwitterHeart}
					progress={this.state.progress}
					enableMergePathsAndroidForKitKatAndAbove
				/>
			</View>
		);
		return <View>{animationSection}</View>;
	};

	renderRow = item => {
		const { AlbumCover, AlbumName, MomentDate } = item.item;

		return (
			<CardUI style={[{ height: cardHeight, width: cardWidth, borderRadius: 0 }]}>
				<TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
					<ImageBackground
						source={{ uri: AlbumCover }}
						style={{ flex: 1 }}
						resizeMode={'cover'}
					/>
				</TouchableOpacity>
				<View
					style={{
						position: 'absolute',
						height: '45%',
						width: '100%',
						bottom: 0,
						padding: 10
					}}
				>
					<View
						style={{
							height: 30,
							width: '100%',
							alignItems: 'flex-end',
							paddingTop: 5,
							backgroundColor: 'transparent'
						}}
					>
						{this.buttonFollow(item)}
					</View>
					<Text
						numberOfLines={3}
						ellipsizeMode={'tail'}
						style={{
							flex: 1,
							color: 'black',
							backgroundColor: 'transparent',
							marginTop: 10
						}}
					>
						{AlbumName}
					</Text>

					<Text
						style={{
							textAlign: 'right',
							color: 'grey',
							backgroundColor: 'transparent',
							fontSize: 11
						}}
					>
						{MomentDate}
					</Text>
				</View>
			</CardUI>
		);
	};

	render() {
		// console.log(this.props);
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					horizontal
					removeClippedSubviews
					data={this.props.apiBundle.data}
					extraData={this.props.apiBundle.data}
					renderItem={rowData => this.renderRow(rowData)}
					keyExtractor={item => item.AlbumID}
					ListFooterComponent={this.renderFooterEnd}
					onEndReached={() => this.state.progress.setValue(0)}
					onEndReachedThreshold={0.5}
					onMomentumScrollEnd={this.finishedAnim}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	onFollow: {
		height: 25,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 15,
		borderColor: 'white',
		backgroundColor: colorFollow
	},
	notFollow: {
		height: 25,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colorFollow,
		borderRadius: 15
	}
});

const mapStateToProps = state => ({
	apiBundle: state.apiReducer
});

const mapDispatchToProps = dispatch => ({
	callService: (url, body) => dispatch(callWebservice(url, body)),
	mutateData: (originalData, singleRowItem) => dispatch(mutateData(originalData, singleRowItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(Horizontal);
