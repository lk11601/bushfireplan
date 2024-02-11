import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
	Input,
	InputField,
	Heading,
	Button,
	ButtonText,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Alert,
	AlertIcon,
	AlertText,
	CloseCircleIcon,
} from '@gluestack-ui/themed';

import supabase from '../database/client';

const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [authError, setAuthError] = useState('');

	const signIn = async () => {
		setAuthError(null);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			console.error(error);
			setAuthError(error);
		}
	};

	const signUp = async () => {
		setAuthError(null);
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			console.error(error);
			setAuthError(error);
		}
	};

	const { top } = useSafeAreaInsets();

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{
						flex: 1,
						padding: 24,
						marginTop: top,
					}}
				>
					<View style={{ gap: 16 }}>
						<View style={{ gap: 8 }}>
							<Heading size="2xl">Fireground Controller</Heading>
							<Heading>Continue by authentication</Heading>
						</View>

						<View style={{ gap: 12, marginBottom: 16 }}>
							<FormControl
								size="md"
								isDisabled={false}
								isInvalid={false}
								isReadOnly={false}
								isRequired={false}
							>
								<FormControlLabel mb="$1">
									<FormControlLabelText>Email</FormControlLabelText>
								</FormControlLabel>
								<Input size="md">
									<InputField
										value={email}
										onChangeText={(text) => setEmail(text)}
										placeholder="john@fireground.com"
									/>
								</Input>
							</FormControl>
							<FormControl size="md">
								<FormControlLabel mb="$1">
									<FormControlLabelText>Password</FormControlLabelText>
								</FormControlLabel>
								<Input>
									<InputField
										value={password}
										secureTextEntry
										onChangeText={(text) => setPassword(text)}
										placeholder="Min. 6 characters"
									/>
								</Input>
							</FormControl>
						</View>
						<Button
							onPress={() => {
								signIn();
							}}
						>
							<ButtonText>{'Login'}</ButtonText>
						</Button>
						<Button
							variant="outline"
							onPress={() => {
								signUp();
							}}
						>
							<ButtonText>{'Create account'}</ButtonText>
						</Button>

						{authError && (
							<Alert action="error" variant="accent">
								<AlertIcon as={CloseCircleIcon} mr="$3" />
								<AlertText>
									There was an error attempting to authenticate you. Please try
									again.
								</AlertText>
							</Alert>
						)}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

App.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

export default App;
