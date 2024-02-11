import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import ViewScreen from '@pages/map/view';
import EditScreen from '@pages/map/edit';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';

const Header = ({ selectedIndex, setSelectedIndex }) => {
	return (
		<BlurView
			style={{
				position: 'absolute',
				padding: 24,
				width: '100%',
				top: 0,
				backgroundColor: 'rgba(0,0,0,0.5)',
				borderBottomLeftRadius: 6,
				borderBottomRightRadius: 6,
			}}
			tint="dark"
			intensity={20}
			zIndex={99}
		>
			<SegmentedControl
				values={['Edit', 'View']}
				appearance="dark"
				selectedIndex={selectedIndex}
				onChange={(event) => {
					setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
				}}
			/>
		</BlurView>
	);
};

Header.propTypes = {
	selectedIndex: PropTypes.any,
	setSelectedIndex: PropTypes.func,
};

const App = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				{selectedIndex === 0 ? <EditScreen /> : <ViewScreen />}
			</View>
			<Header
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
		</View>
	);
};

export default App;
