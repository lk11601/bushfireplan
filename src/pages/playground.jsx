
import React, { useState } from 'react';

import {
	Image,
	SafeAreaView,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from 'react-native';

import {
	ButtonIcon,
	Button,
	AddIcon,
	TrashIcon,
	CheckIcon,
	ArrowLeftIcon,
} from '@gluestack-ui/themed';

import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';

import { Shape } from '@/pages/dashboard/admin/project/shape';
// import EditInfo from './create/edit-info';
import marker from '../../assets/marker.png';

const iconButtonProps = {
	borderRadius: '$full',
	h: 48,
	w: 48,
};

const shapeInfo = {
	title: 'test shape',
	description: '10 feb 24',
	borderWidth: 4,
	borderColor: 'red',
	insideColor: 'rgba(0,255,64,0.4)',
};

const tomPriceRegion = '{"longitude":117.78554426637918,"latitude":-22.690998367965765,"latitudeDelta":0.10124375064796354,"longitudeDelta":0.06061991706127401}';



const App = () => {
	const [markers, setMarkers] = useState([]);
	const [region, setRegion] = useState(JSON.parse(tomPriceRegion));
	const [shapes, setShapes] = useState([]);

	const addMarker = ({ title, location }) => {
		setMarkers([...markers, { title, location }]);
	};

	const onRegionChange = (region) => {
		setRegion(region);
	};

	const undoMarkerPlace = () => {
		const newMarkers = markers.slice(0, -1);
		setMarkers(newMarkers);
	};

	var lastTap = null;
	const handleDoubleTap = () => {
		const now = Date.now();
		const DOUBLE_PRESS_DELAY = 300;
		if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
			addMarker({
				title: 'Marker',
				location: {
					latitude: region.latitude,
					longitude: region.longitude,
				},
			});
		} else {
			lastTap = now;
		}
	};

	const createShape = ({ markers, shapeInfo }) => {
		const coordinates = JSON.stringify(
			markers.map((marker) => ({
				latitude: marker.location.latitude,
				longitude: marker.location.longitude,
			}))
		);
		setShapes([
			...shapes,
			{
				id: Math.random(),
				type: markers.length > 2 ? 'polygon' : markers.length > 1 ? 'line' : 'marker',
				border_color: shapeInfo.borderColor,
				border_width: shapeInfo.borderWidth,
				title: shapeInfo.title,
				description: shapeInfo.description,
				coordinates: coordinates,
			},
		]);
		setMarkers([]);
	};

	return (
		<View style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handleDoubleTap}>
				<View style={styles.map}>
					<StatusBar style="light" />
					<MapView
						style={styles.map}
						initialRegion={region}
						onRegionChangeComplete={onRegionChange}
						mapType={'hybrid'}
						zoomTapEnabled={false}
					>
						{markers.length >= 1 && (
							<Shape
								type={
									markers.length > 2
										? 'polygon'
										: markers.length > 1
											? 'line'
											: 'marker'
								}
								points={markers.map((marker) => marker.location)}
								color={'yellow'}
								borderWidth={4}
							/>
						)}
						{shapes.map((shape) => {
							return (
								<Shape
									key={shape.id}
									id={shape.id}
									type={shape.type}
									color={shape.border_color}
									borderWidth={shape.border_width}
									name={shape.title}
									description={shape.description}
									points={JSON.parse(shape.coordinates)}		
								/>
							);
						})}
					</MapView>
					<View style={styles.markerFixed}>
						<Image style={styles.marker} source={marker} />
					</View>
					<SafeAreaView style={styles.footer}>
						<View style={{ flexDirection: 'row', padding: 16, gap: 16, paddingHorizontal: 24, alignItems: 'center'}}>
							<Button
								{...iconButtonProps}
								bg="red"
								onPress={() => {
									setMarkers([]);
								}}
							>
								<ButtonIcon as={TrashIcon} />
							</Button>
							<Button {...iconButtonProps} bg="black" onPress={undoMarkerPlace}>
								<ButtonIcon as={ArrowLeftIcon} />
							</Button>
							
							<Button {...iconButtonProps} bg="black" onPress={()=>{
								createShape({
									markers: markers,
									shapeInfo: shapeInfo,
								});
							}}>
								<ButtonIcon as={CheckIcon} />
							</Button>
							<View style={{ flex: 1 }} />

							<Button

								h={72}
								w={72}
								borderRadius={36}
								bg="black"
								onPress={() => {
									addMarker({
										title: 'Marker',
										location: {
											latitude: region.latitude,
											longitude: region.longitude,
										},
									});
								}}
							>
								<ButtonIcon as={AddIcon} />
							</Button>
						</View>
					</SafeAreaView>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	markerFixed: {
		left: '50%',
		marginLeft: -24,
		marginTop: -36,
		position: 'absolute',
		top: '50%',
	},
	marker: {
		height: 48,
		width: 48,
	},
	footer: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		bottom: 0,
		position: 'absolute',
		width: '100%',
		gap: 8,
	},
	region: {
		color: '#fff',
		lineHeight: 20,
		margin: 20,
	},
});

export default App;


// import React, { useState } from 'react';
// // import mapview
// import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View, Alert } from 'react-native';

// import SegmentedControl from '@react-native-segmented-control/segmented-control';

// const exampleShapes = [
// 	{
// 		id: '1',
// 		points: [
// 			{
// 				latitude: 51.507,
// 				longitude: 0.126,
// 			},
// 		],
// 	},
// 	{
// 		id: '2',
// 		points: [
// 			{
// 				latitude: 51.5,
// 				longitude: 0.122,
// 			},
// 			{
// 				latitude: 51.505,
// 				longitude: 0.1278,
// 			},
// 		],
// 	},
// 	{
// 		id: '3',
// 		points: [
// 			{
// 				latitude: 51.5074,
// 				longitude: 0.1278,
// 			},
// 			{
// 				latitude: 51.502,
// 				longitude: 0.1278,
// 			},
// 			{
// 				latitude: 51.502,
// 				longitude: 0.1228,
// 			},
// 		],
// 	},
// 	{
// 		id: '4',
// 		line: true,
// 		points: [
// 			{
// 				latitude: 51.5074,
// 				longitude: 0.1278,
// 			},
// 			{
// 				latitude: 51.502,
// 				longitude: 0.1278,
// 			},
// 			{
// 				latitude: 51.502,
// 				longitude: 0.1228,
// 			},
// 		],
// 	},
// ];

// const App = () => {
// 	const [mapInEditMode, setMapInEditMode] = useState(0);
// 	const [shapes, setShapes] = useState(exampleShapes);
// 	const [currentShape, setCurrentShape] = useState([]);
// 	const [lineMode, setLineMode] = useState(false);

// 	const finishedShape = () => {
// 		setShapes([...shapes, { id: Math.random(), points: currentShape }]);
// 		setCurrentShape([]);
// 		setMapInEditMode(false);
// 	};

// 	const handleMapPress = (e) => {
// 		if (mapInEditMode) {
// 			setCurrentShape([...currentShape, e.nativeEvent.coordinate]);
// 		} else {
			
// 		}
// 	};

// 	return (
// 		<SafeAreaView style={{ flex: 1 }}>
// 			<MapView
// 				style={{
// 					flex: 1,
// 					padding: 16,
// 				}}
// 				legalLabelInsets={{ right: -10000 }}
// 				userInterfaceStyle="dark"
// 				mapType="satellite"
// 				region={{
// 					latitude: 51.5074,
// 					longitude: 0.1278,
// 					latitudeDelta: 0.011,
// 					longitudeDelta: 0.011,
// 				}}
// 				onPress={handleMapPress}
// 			>
// 				{shapes.map((shape) => (
// 					<Shape
// 						key={shape.id}
// 						shape={shape}
// 						shapes={shapes}
// 						setShapes={setShapes}
// 						strokeWidth={shape.strokeWidth}
// 					/>
// 				))}
// 				{currentShape.length > 0 && (
// 					<Shape shape={{ points: currentShape, line: lineMode }} />
// 				)}
// 				<SegmentedControl
// 					values={['Move', 'Edit']}
// 					selectedIndex={mapInEditMode}
// 					onChange={(event) => {
// 						setMapInEditMode(event.nativeEvent.selectedSegmentIndex);
// 					}}
// 				/>
// 			</MapView>
// 		</SafeAreaView>
// 	);
// };

// export default App;

// const Shape = ({ shape, shapes, setShapes, strokeWidth }) => {
// 	const { points } = shape;
// 	const onShapePress = () => {
// 		Alert.alert(
// 			'Delete shape?',
// 			'Are you sure you want to delete this shape?',
// 			[
// 				{
// 					text: 'Cancel',
// 					style: 'cancel',
// 				},
// 				{
// 					text: 'Delete',
// 					onPress: () => {
// 						setShapes(
// 							shapes.filter((currentShape) => currentShape.id !== shape.id)
// 						);
// 					},
// 				},
// 			]
// 		);
// 	};
// 	if (points.length === 1) {
// 		return (
// 			<Marker
// 				coordinate={points[0]}
// 				onPress={() => {
// 					Alert.alert(shape.id + ' tapped');
// 				}}
// 			>
// 				<View
// 					style={{
// 						backgroundColor: 'rgba(255,0,0,0.5)',
// 						width: 16,
// 						height: 16,
// 						borderRadius: 10,
// 					}}
// 				/>
// 			</Marker>
// 		);
// 	} else if (points.length === 2) {
// 		return (
// 			<Polyline
// 				coordinates={points}
// 				strokeWidth={strokeWidth}
// 				onPress={() => {
// 					Alert.alert(shape.id + ' tapped');
// 				}}
// 			/>
// 		);
// 	} else if (points.length > 2) {
// 		if (shape.line) {
// 			return (
// 				<Polyline
// 					coordinates={points}
// 					strokeWidth={strokeWidth}
// 					onPress={() => {
// 						Alert.alert(shape.id + ' tapped');
// 					}}
// 				/>
// 			);
// 		} else {
// 			return (
// 				<Polygon coordinates={points} strokeWidth={5} onPress={onShapePress} />
// 			);
// 		}
// 	}
// };

// // import { Stack, Tiles } from '@mobily/stacks';
// // import React from 'react';
// // import {
// // 	Text,
// // 	Avatar,
// // 	Badge,
// // 	Button,
// // 	Inset,
// // 	TextArea,
// // 	Input,
// // 	colors,
// // } from '@geist';
// // import {
// // 	Keyboard,
// // 	ScrollView,
// // 	TouchableWithoutFeedback,
// // 	View,
// // } from 'react-native';
// // import Slider from '@react-native-community/slider';
// // const App = () => {
// // 	const showAllElements = false;
// // 	const showPolygonForm = true;
// // 	return (
// // 		<ScrollView style={{ flex: 1 }}>
// // 			<>
// // 				{showAllElements && <ShowAllElements />}
// // 				{showPolygonForm && <PolygonForm />}
// // 			</>
// // 		</ScrollView>
// // 	);
// // };

// // const PolygonForm = () => {
// // 	return (
// // 		<TouchableWithoutFeedback onPress={Keyboard.dismiss()} style={{ flex: 1 }}>
// // 			<Stack padding={4} space={4}>
// // 				<Text h3>Edit polygon details</Text>
// // 				<Stack space={3}>
// // 					<Text h6>Shape title</Text>
// // 					<Input placeholder="Ex. Maintenance shed" />
// // 				</Stack>
// // 				<Stack space={3}>
// // 					<Text h6>Additional info</Text>
// // 					<TextArea placeholder="Ex. This is where all of the machinery for this property is kept." />
// // 				</Stack>
// // 				{/* <Stack horizontal>
// // 					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
// // 						return (
// // 							<View
// // 								key={i}
// // 								style={{
// // 									width: '10%',
// // 									aspectRatio: 1,
// // 									backgroundColor: `hsl(${(i * 360) / 10}, 100%, 50%)`,
// // 								}}
// // 							/>
// // 						);
// // 					})}
// // 				</Stack> */}
// // 				<Slider
// // 					style={{ height: 40 }}
// // 					minimumValue={0}
// // 					maximumValue={1}
// // 					minimumTrackTintColor="#FFFFFF"
// // 					maximumTrackTintColor={colors.accents_2}
// // 				/>
// // 			</Stack>
// // 		</TouchableWithoutFeedback>
// // 	);
// // };

// // const ShowAllElements = () => {
// // 	return (
// // 		<Stack padding={4} space={4}>
// // 			<Text h1>Heading 1</Text>
// // 			<Text h2>Heading 2</Text>
// // 			<Text h3>Heading 3</Text>
// // 			<Text h4>Heading 4</Text>
// // 			<Text h5>Heading 5</Text>
// // 			<Text h6>Heading 6</Text>
// // 			<Text h>Normal text</Text>
// // 			<Text h>
// // 				Id irure voluptate cillum ex aliqua nostrud reprehenderit. Officia do
// // 				incididunt ex et. Non consectetur reprehenderit fugiat ex laborum
// // 				reprehenderit irure incididunt pariatur. Mollit ipsum dolor veniam velit
// // 				ut proident irure.
// // 			</Text>

// // 			<Avatar />

// // 			<Badge>Normal</Badge>
// // 			<Badge type="success">Success</Badge>
// // 			<Badge type="warning">Warning</Badge>
// // 			<Badge type="error">Error</Badge>

// // 			<Button>Empty button</Button>
// // 			<Button loading>Loading button</Button>
// // 			<Button type="success">Success button</Button>
// // 			<Button type="secondary">Success button</Button>

// // 			<Inset />
// // 		</Stack>
// // 	);
// // };

// // export default App;
