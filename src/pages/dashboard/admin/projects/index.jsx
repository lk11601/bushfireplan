import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './list';
import New from './new';
import Project from '@pages/dashboard/admin/project';
import CreateShape from '@pages/dashboard/admin/project/create';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Home"
				component={List}
				options={{
					headerShown: true,
					headerTitle: 'Projects',
				}}
			/>
			<Stack.Screen name="New" component={New} />
			<Stack.Screen
				name="Project"
				component={Project}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="CreateShape"
				component={CreateShape}
				options={{
					headerTitle: 'Create shape',
					headerBackTitleVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default App;
