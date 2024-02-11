import React from 'react';
import { Alert } from 'react-native';
import { Polygon, Polyline, Marker } from 'react-native-maps';
import { ColorTranslator } from 'colortranslator';
import supabase from '../../../../database/client';

/**
 * Renders a shape on a map. The type of shape is determined by the number of points:
 * - 1 point for a marker
 * - 2 points for a line
 * - 3 or more points for a polygon
 * Additionally, it handles deletion through an alert dialog.
 *
 * @component
 * @param {Object} props - Properties passed to the component
 * @param {Array} props.points - The coordinates for the shape
 * @param {string} props.color - The color of the shape or the marker
 * @param {number} props.borderWidth - The width of the border/stroke
 * @param {string} props.name - Name associated with the shape
 * @param {string} props.description - Description of the shape
 * @param {number} [props.id] - Optional ID, useful for deletion if the shape is stored in a database
 */

export const Shape = (props) => {
	const { points, color, borderWidth, name, description } = props;
	
	const fillColor = new ColorTranslator(color).setA(0.4).RGBA;

	let type;
	if (points.length > 2) {
		type = 'polygon';
	} else if (points.length === 2) {
		type = 'line';
	} else if (points.length === 1) {
		type = 'marker';
	} else {
		return null; // Return null if no points are provided
	}

	switch (type) {
	case 'polygon':
		return (
			<Polygon
				coordinates={points}
				strokeColor={color}
				fillColor={fillColor}
				strokeWidth={borderWidth}
				tappable={true}
				onPress={() => {
					Alert.alert(name, description, [
						{
							text: 'Delete',
							onPress: async () => {
								
								const { error } = supabase
									.from('shapes')
									.delete()
									.eq('id', props.id);
								if (error) {
									console.error(error);
								}
							},
							style: 'destructive',
						},
						{
							text: 'Cancel',
							style: 'cancel',
						},
					]);
				}}
			/>
		);

	case 'line':
		return (
			<Polyline
				coordinates={points}
				strokeColor={color}
				strokeWidth={borderWidth}
			/>
		);

	case 'marker':
		return (
			<Marker
				coordinate={points[0]}
				tappable={true}
				onPress={() => {
					Alert.alert(name, description);
				}}
			/>
		);

	default:
		return null;
	}
};
