import React, { useState } from 'react';
import { View } from 'react-native';
import {
	Input,
	InputField,
	Textarea,
	TextareaInput,
	Button,
	ButtonText,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const App = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSave = () => {
		return;		
	};

	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				backgroundColor: '#000',
				padding: 24,
				flex: 1,
				paddingTop: insets.top,
				gap: 16,
			}}
		>
			<Input>
				<InputField placeholder="Shape title" onChange={setTitle} value={title} />
			</Input>
			<Textarea
				value={description}
				onChangeText={setDescription}
				placeholder="Enter description"
			>
				<TextareaInput />
			</Textarea>
			<Button onPress={handleSave}>
				<ButtonText>Save</ButtonText>
			</Button>
		</View>
	);
};

export default App;
