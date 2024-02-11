import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import {
	Button,
	ButtonText,
	Fab,
	FabIcon,
	FabLabel,
	AddIcon,
} from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';

import { Shape } from './shape';

import { getAllShapes, reload, fetchData, openCreateShape, shareLocation, requestLocation } from './functions';
import { LocationDisplay } from './components';

const App = ({ route, navigation }) => {
	const { project } = route.params;
	const [shapes, setShapes] = useState([]);
	const [userLocations, setUserLocations] = useState([]);
	const [location, setLocation] = useState();

	useEffect(() => {
		requestLocation(setLocation);
		fetchData({
			setShapes: setShapes,
			setUserLocations: setUserLocations,
			project: project,
		});
	}, []);

	const mapRef = useRef(null);

	useFocusEffect(
		React.useCallback(() => {
			reload(false);
		}, [])
	);

	return (
		<>
			<MapView
				style={{
					flex: 1,
				}}
				ref={mapRef}
				legalLabelInsets={{ right: -10000 }}
				userInterfaceStyle="dark"
				mapType="hybrid"
				region={JSON.parse(project.region)}
				showsUserLocation={true}
				onPress={async (pressedWhere) => {
					console.log(
						'pressedWhere.nativeEvent.coordinate' +
							pressedWhere.nativeEvent.coordinate
					);
				}}
			>
				{userLocations.map((userLocation, index) => {
					return (
						<Marker
							coordinate={userLocation.location}
							key={index}
							centerOffset={{ x: 0, y: 40 }}
						>
							<LocationDisplay userLocation={userLocation} />
						</Marker>
					);
				})}
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
							getAllShapes={()=>{
								getAllShapes({
									setShapes: setShapes,
									project: project,
								});
							}}
						/>
					);
				})}
			</MapView>
			<View
				style={{
					position: 'absolute',
					padding: 24,
					width: '100%',
					gap: 12,
					height: '100%',
				}}
			>
				<Button onPress={()=>{
					openCreateShape({
						navigation: navigation,
						project: project,
					});
				}}>
					<ButtonText>Create shape</ButtonText>
				</Button>
				<Button onPress={()=>{
					shareLocation({
						location: location,
					});
					
				}}>
					<ButtonText>Share location</ButtonText>
				</Button>
				<Fab
					size="md"
					placement="bottom right"
						
				>
					<FabIcon as={AddIcon} mr="$1" />
					<FabLabel>Shape</FabLabel>
				</Fab>
				<Fab
					size="md"
					placement="bottom left"
						
				>
					<FabIcon as={AddIcon} mr="$1" />
					<FabLabel>Shape</FabLabel>
				</Fab>
			</View>
		</>
	);
};

export default App;
