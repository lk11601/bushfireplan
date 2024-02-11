import React from 'react';
import { Button, ActionSheetIOS, Alert } from 'react-native';
import { useStore } from '@/database/database';
import { changeName, changeUsername } from '@/util/data';


export const AccountHeaderButton = () => {
	const removeProfilePicture = useStore((state) => state.removeProfilePicture);
	const signOut = useStore((state) => state.signOut);

	return (
		<Button
			onPress={() => {
				ActionSheetIOS.showActionSheetWithOptions(
					{
						options: [
							'Cancel',
							'Change profile picture',
							'Change name',
							'Change username',
							'Log out',
						],
						destructiveButtonIndex: 4,
						cancelButtonIndex: 0,
						tintColor: '#fff',
					},
					(buttonIndex) => {
						//ANCHOR Change profile picture
						if (buttonIndex === 1) {
							ActionSheetIOS.showActionSheetWithOptions(
								{
									options: [
										'Cancel',
										'Choose from camera roll',
										'Remove picture',
									],
									destructiveButtonIndex: 2,
									cancelButtonIndex: 0,
									tintColor: '#fff',
								},
								(pressedIndex) => {
									if (pressedIndex === 1) {
										Alert.alert('Not implemented');
									} else if (pressedIndex === 2) {
										removeProfilePicture();
									}
								}
							);
						} else if (buttonIndex === 2) {
							Alert.prompt('Change name', 'Enter your new name', (text) => {
								changeName(text);
								return;
							});
						} else if (buttonIndex === 3) {
							Alert.prompt(
								'Change username',
								'Enter your new username',
								(text) => {
									changeUsername(text);
								}
							);
						}
						//ANCHOR Log out
						else if (buttonIndex === 4) {
							signOut();
						}
					}
				);
			}}
			title="Edit"
			color="#fff"
		/>
	);
};