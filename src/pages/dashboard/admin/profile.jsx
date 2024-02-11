import React, { useEffect, useState } from 'react';
import { Margin, Text } from '@geist';
import { Stack } from '@mobily/stacks';
import { Button, ButtonText } from '@gluestack-ui/themed';

import supabase from '../../../database/client';
import { ScrollView } from 'react-native';

const App = () => {
	const [email, setEmail] = useState();
	const [profileData, setProfileData] = useState();
	const [loading, setLoading] = useState(true);

	const fetchUserData = async () => {
		setLoading(true);
		const { data: sessionData, error } = await supabase.auth.getSession();
		if (sessionData.session) {
			const session = sessionData.session;
			const { id, email } = session.user;
			setEmail(email);
			const { data: profileData, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', id)
				.single();
			if (profileData) {
				setProfileData(profileData);
				setLoading(false);
			}
			error && console.error(error);
		}
		error && console.error(error);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<ScrollView>
			{!loading && (
				<>
					<Stack space={1.5} padding={4}>
						<Button onPress={fetchUserData}>
							<ButtonText>Reload page</ButtonText>
						</Button>
						<Margin t={2} />
						<Text h6>name</Text>
						<Text h>
							{profileData.full_name ? profileData.full_name : 'No name yet'}
						</Text>
						<Margin t={4} />
						<Margin t={2} />
						<Text h6>Username</Text>
						<Text h>
							{profileData.username ? profileData.username : 'No username yet'}
						</Text>
						<Margin t={4} />
						<Margin t={2} />
						<Text h6>Email</Text>
						<Text h>{email}</Text>
						<Margin t={4} />
					</Stack>
				</>
			)}
		</ScrollView>
	);
};

export default App;
