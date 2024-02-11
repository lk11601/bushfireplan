import { fetchTeamId, getUserId } from '../../../../util/utils';
import supabase from '../../../../database/client';
import * as Location from 'expo-location';
import { ReloadButton } from './components';
import { reloadToast } from '@/util/toasts';

/**
 * Creates a shape in the database.
 * 
 * @param {Object} options - The options for creating the shape.
 * @param {Array} options.markers - The markers used to define the shape's coordinates.
 * @param {Object} options.project - The project object.
 * @param {Object} options.shapeInfo - The information about the shape.
 * @param {Object} options.navigation - The navigation object.
 * @returns {Promise<void>} - A promise that resolves when the shape is created.
 */

export const createShape = async ({ markers, project, shapeInfo, navigation }) => {
	const coordinates = JSON.stringify(
		markers.map((marker) => ({
			latitude: marker.location.latitude,
			longitude: marker.location.longitude,
		}))
	);
	const { data, error } = await supabase
		.from('shapes')
		.insert([
			{
				project_id: project.id,
				coordinates: coordinates,
				border_color: shapeInfo.borderColor,
				inside_color: shapeInfo.insideColor,
				border_width: shapeInfo.borderWidth,
				title: shapeInfo.title,
				description: shapeInfo.description,
			},
		])
		.select('*');
	if (error) {
		console.error('error', error);
	} else if (data) {
		navigation.goBack();
	}
};

export const getAllShapes = async (project) => {
	const { data, error } = await supabase
		.from('shapes')
		.select('*')
		.eq('project_id', project.id);
	if (data) {
		return data;
	} else if (error) {
		
		return error;
	}
};

export const fetchLocations = async () => {
	const teamId = await fetchTeamId();
	const { data: teamMembers, error } = await supabase
		.from('teams')
		.select('members')
		.eq('id', teamId)
		.single();
	if (teamMembers) {
		
		const { data, error } = await supabase
			.from('users')
			.select('location, location_updated, full_name')
			.in('id', teamMembers.members);
		if (data) {
			
			return data;
		}
		error && console.error(error);
	}
	error && console.error(error);
};

export const requestLocation = (setLocation) => {
	(async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.error('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	})();
};

export const reload = async (showToast) => {
	showToast && reloadToast();
	getAllShapes();
	fetchLocations();
};

export const shareLocation = async ({location}) => {
	const userId = await getUserId();
	const { error } = await supabase
		.from('users')
		.upsert([
			{
				id: userId,
				location: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				},
				location_updated: 'now()',
			},
		])
		.eq('id', userId);
	error && console.error(error);
};

export const fetchData = async ({ setShapes, setUserLocations, project }) => {
	const locations = await fetchLocations();
	const shapes = await getAllShapes(project);
	setShapes(shapes);
	setUserLocations(locations);
};

export const openCreateShape = async ({ navigation, project }) => {
	navigation.navigate('CreateShape', { project });
};

export const setHeader = ({ navigation, project }) => {
	navigation.setOptions({
		headerShown: true,
		headerTitle: project.name,
		tintColor: '#fff',
		headerRight: () => <ReloadButton onPress={reload} />,
	});
};
