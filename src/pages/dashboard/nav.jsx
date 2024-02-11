import React from 'react';
import 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNav from '@pages/dashboard/admin/nav';

const DashNav = createNativeStackNavigator();

const App = () => {
	return (
		<DashNav.Navigator
			initialRouteName="AdminTabs"
			screenOptions={{
				contentStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerLargeStyle: { backgroundColor: '#111', color: '#fff' },
				headerTitleStyle: {
					color: '#fff',
				},
				headerStyle: { backgroundColor: '#111' },
			}}
		>
			<DashNav.Screen
				name="AdminTabs"
				component={TabsNav}
				options={{
					headerShown: false,
				}}
			/>
		</DashNav.Navigator>
	);
};

export default App;
