import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const App = () => {
	const { bottom } = useSafeAreaInsets();
	return (
		<View style={{ flex: 1, backgroundColor: 'red' }}>
			<MapView
				style={{ flex: 1 }}
				legalLabelInsets={{ right: -10000 }}
				cacheEnabled
				userInterfaceStyle="dark"
				initialCamera={{
					center: {
						latitude: -31.014,
						longitude: 115.33,
					},
					pitch: 0,
					heading: 0,
					altitude: 20000,
				}}
				mapType="satellite"
			/>
			<BlurView
				tint="dark"
				style={{
					position: 'absolute',
					bottom: 0,
					height: bottom,
					width: '100%',
				}}
			/>
		</View>
	);
};

export default App;
