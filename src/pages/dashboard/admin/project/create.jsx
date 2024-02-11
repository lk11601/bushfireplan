import React, { useEffect, useState } from 'react';

import {
	Image,
	SafeAreaView,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Modal,
	Alert,
} from 'react-native';

import {
	ButtonIcon,
	Button,
	AddIcon,
	TrashIcon,
	CheckIcon,
	ArrowLeftIcon,
	EditIcon,
} from '@gluestack-ui/themed';

import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';

import { Shape } from './shape';
import EditInfo from './create/edit-info';

import { createShape } from './functions';
import marker from '../../../../../assets/marker.png';

const iconButtonProps = {
	borderRadius: '$full',
	h: 48,
	w: 48,
};

const initialShapeInfo = {
	title: 'test shape',
	description: '10 feb 24',
	borderWidth: 4,
	borderColor: 'red',
	insideColor: 'rgba(0,255,64,0.4)',
};

const App = ({ route, navigation }) => {
	const { project } = route.params;
	const [markers, setMarkers] = useState([]);
	const [region, setRegion] = useState(JSON.parse(project.region));
	const [modalVisible, setModalVisible] = useState(false);
	const [shapeInfo, setShapeInfo] = useState(initialShapeInfo);

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

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: `${project.name.toUpperCase()} - NEW SHAPE`,
		});
	}, [route]);

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

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<EditInfo shapeInfo={shapeInfo} setShapeInfo={setShapeInfo} />
			</Modal>
			<TouchableWithoutFeedback onPress={handleDoubleTap}>
				<View style={styles.map}>
					<StatusBar style="light" />
					<MapView
						style={styles.map}
						initialRegion={region}
						onRegionChangeComplete={onRegionChange}
						mapType={'satellite'}
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
								color={'#f00'}
							/>
						)}
					</MapView>
					<View style={styles.markerFixed}>
						<Image style={styles.marker} source={marker} />
					</View>
					<SafeAreaView style={styles.footer}>
						<View style={{ flexDirection: 'row', padding: 16, gap: 8 }}>
							<Button
								{...iconButtonProps}
								bg="red"
								onPress={() => {
									navigation.goBack();
								}}
							>
								<ButtonIcon as={TrashIcon} />
							</Button>
							<Button {...iconButtonProps} bg="black" onPress={undoMarkerPlace}>
								<ButtonIcon as={ArrowLeftIcon} />
							</Button>
							<Button
								{...iconButtonProps}
								bg="black"
								onPress={() => {
									setModalVisible(true);
								}}
							>
								<ButtonIcon as={EditIcon} />
							</Button>
							<Button {...iconButtonProps} bg="black" onPress={()=>{
								createShape({
									markers: markers,
									shapeInfo: shapeInfo,
									project: project,
									navigation: navigation,
								});
							}}>
								<ButtonIcon as={CheckIcon} />
							</Button>
							<View style={{ flex: 1 }} />

							<Button
								{...iconButtonProps}
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
		marginTop: -48,
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
