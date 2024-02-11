/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { Text, Badge } from '@geist';
import { useStore } from '@db';
import reactotron from 'reactotron-react-native';

const ListedUser = ({ userId }) => {
	const user = useStore((state) => state.userData);
	const isSelf = user.id === userId;
	const users = useStore((state) => state.users);
	const userObject = users.find((user) => user.id === userId);
	const userAvatar = userObject?.avatar_url;
	reactotron.log('userObject', userObject);
	return (
		<View
			style={{
				height: 64,
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<View style={{ width: 64, height: 64 }}>
				{userAvatar && (
					<Image
						source={{
							uri: userObject.avatar_url,
						}}
						style={{
							height: 64,
							width: 64,
						}}
					/>
				)}
			</View>

			<View
				style={{
					height: 64,
					justifyContent: 'center',
					marginLeft: 16,
				}}
			>
				<Text numberOfLines={1}>{userObject.full_name}</Text>
				<Text small numberOfLines={1} color="accents_6">
					{`@${userObject.username}`}
				</Text>
			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'flex-end',
					marginRight: 16,
				}}
			>
				{isSelf && <Badge type="success">Owner</Badge>}
				{/* <ButtonWrapper
					hitSlop={64}
					style={{ paddingVertical: 8 }}
					onPress={onPress}
					unstable_onPressInDelay={100}
				>
					<Octicons name={!isMember ? 'plus' : 'x'} size={24} color="white" />
				</ButtonWrapper> */}
			</View>
		</View>
	);
};

ListedUser.propTypes = {
	buttonLoading: PropTypes.any,
	buttonText: PropTypes.string,
	index: PropTypes.number,
	onPress: PropTypes.func,
	signIntoAccount: PropTypes.func,
	type: PropTypes.any,
	userObject: PropTypes.object,
};

ListedUser.defaultProps = {
	signIntoAccount: () => {},
	userObject: {},
	onPress: () => {},
	buttonText: 'Invite to team',
};

export { ListedUser };
