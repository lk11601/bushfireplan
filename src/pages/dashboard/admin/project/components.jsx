import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { timePassed } from '@/util/utils';

export const ReloadButton = ({ onPress }) => {
	return (
		<Pressable onPress={onPress}>
			<Feather name="refresh-cw" size={24} color="white" />
		</Pressable>
	);
};

export const LocationDisplay = ({ userLocation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.triangle} />
			<View style={styles.locationContainer}>
				<Text style={styles.locationText}>
					{userLocation.full_name}
					{'\n'}
					{timePassed(userLocation.location_updated)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 52 / 3,
		borderRightWidth: 52 / 3,
		borderBottomWidth: 52 / 2,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'rgba(0,0,0,0.65)',
	},
	locationContainer: {
		backgroundColor: 'rgba(0,0,0,0.65)',
		borderRadius: 16,
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	locationText: {
		color: 'white',
	},
});
