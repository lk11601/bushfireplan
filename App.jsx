import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, View } from 'react-native';
import { SwitchPage } from '@pages/switch';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setCustomScrollView } from 'react-native-global-props';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';

LogBox.ignoreLogs(['Remote debugger']);

const customScrollViewProps = {
	showsVerticalScrollIndicator: false,
	showsHorizontalScrollIndicator: false,
};

const App = () => {
	useEffect(() => {
		setCustomScrollView(customScrollViewProps);
	}, []);

	return (
		<GluestackUIProvider config={config.theme} colorMode="dark">
			<SafeAreaProvider>
				<StatusBar style="light" />
				<Nav />
			</SafeAreaProvider>
		</GluestackUIProvider>
	);
};

const Nav = () => {
	return (
		<NavigationContainer theme={DarkTheme}>
			<View style={{ flex: 1 }}>
				<SwitchPage />
				<StatusBar style="light" />
			</View>
		</NavigationContainer>
	);
};

export default App;
