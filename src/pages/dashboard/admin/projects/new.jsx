import React, { useState } from 'react';
import { Button, Inset } from '@geist';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { useStore } from '@db';

const App = ({ navigation, route }) => {
	const projectName = route.params.projectName;
	const getAllProjects = useStore((state) => state.getAllProjects);
	const createProject = useStore((state) => state.createProject);
	const [region, setRegion] = useState({
		latitude: -25.042261,
		longitude: 117.793221,
		latitudeDelta: 10,
		longitudeDelta: 10,
	});

	return (
		<>
			<MapView
				style={{
					flex: 1,
					padding: 24,
					paddingBottom: 42,
					justifyContent: 'flex-end',
				}}
				showsUserLocation={true}
				initialRegion={region}
				mapType="hybrid"
				onRegionChangeComplete={(region) => {
					setRegion(region);
				}}
			></MapView>
			<View
				style={{
					position: 'absolute',
					bottom: 4,
					width: '100%',
					paddingHorizontal: 16,
				}}
			>
				<Button
					type="success"
					onPress={async () => {
						await createProject({
							projectName: projectName,
							region: region,
						});
						await getAllProjects();
						navigation.popToTop();
					}}
				>
					Create project with map in view
				</Button>
				<Inset />
			</View>
		</>
	);
};

export default App;
