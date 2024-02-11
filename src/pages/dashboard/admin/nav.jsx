import React from 'react';
import 'expo-splash-screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Profile from '@/pages/dashboard/admin/profile';
import Projects from '@/pages/dashboard/admin/projects';
import Team from '@/pages/dashboard/admin/team';
import AccountHeaderButton from '@/pages/dashboard/admin/components';

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#fff',
				tabBarShowLabel: false,
				headerTitleStyle: {
					color: '#fff',
					fontSize: 18,
				},
			}}
		>
			<Tab.Screen
				name="Projects"
				component={Projects}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Feather name="briefcase" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Team"
				component={Team}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="users" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Account"
				component={Profile}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="user" color={color} size={size} />
					),
					headerRight: () => <AccountHeaderButton />,
				}}
			/>
		</Tab.Navigator>
	);
};



export default App;
