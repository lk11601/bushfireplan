// import reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import * as Location from 'expo-location';

import AdminDashboard from './admin/dashboard';
import MemberDashboard from './member/dashboard';

const App = () => {
	const userIsAdmin = true;

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				return;
			}
		})();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{userIsAdmin === true ? (
				<AdminDashboard />
			) : userIsAdmin === false ? (
				<MemberDashboard />
			) : null}
		</View>
	);
};

App.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

export default App;

// possible details about someone: id, username, email, avatar_url, admin, created_at, updated_at, full_name
