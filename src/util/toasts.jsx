import Toast from 'react-native-toast-message';

export const reloadToast = () => {
	Toast.show({
		type: 'success',
		text1: 'Locations and shapes reloaded successfully!',
	});
};

export const greenToast = (text) => {
	Toast.show({
		type: 'success',
		text1: text,
	});
};
