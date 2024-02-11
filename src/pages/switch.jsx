import React, { useEffect, useState } from 'react';
import supabase from '@db';
import DashboardPage from '@src/pages/dashboard/nav';
import AuthPage from '@pages/auth/';
import { View } from 'react-native';
import PlaygroundPage from './playground';
import Toast from 'react-native-toast-message';

const SwitchPage = () => {
	const [userExists, setUserExists] = useState(2);
	const showPlayground = true;

	useEffect(() => {
		const makeThingsRight = async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session) {
				setUserExists(1);
			} else {
				setUserExists(0);
			}

			supabase.auth.onAuthStateChange((event, sess) => {
				
				if (sess) {
					setUserExists(1);
				} else {
					setUserExists(0);
				}
			});
		};
		makeThingsRight();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#000' }}>
			{showPlayground ? (
				<PlaygroundPage />
			) : userExists === 2 ? (
				<View />
			) : userExists === 1 ? (
				<DashboardPage />
			) : (
				<AuthPage />
			)}
			<Toast />
		</View>
	);
};

export { SwitchPage };
