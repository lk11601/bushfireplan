/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Avatar, Badge, Text, Button } from '@geist';
import { Box, Stack } from '@mobily/stacks';

const UserAvatarNameUsername = ({ userObject }) => {
	return (
		<Stack space={4} style={{ flex: 1, alignItems: 'center' }}>
			{userObject && userObject.avatar_url && (
				<Avatar
					source={{
						uri: userObject.avatar_url,
					}}
					width={64}
				/>
			)}
			<Stack space={1}>
				<Text numberOfLines={1} center>
					{userObject.full_name}
				</Text>
				<Text small numberOfLines={1} color="accents_6" center>
					@{userObject.username}
				</Text>
			</Stack>
		</Stack>
	);
};

const UserCardInfo = ({ userObject }) => {
	return (
		<Card style={{ flex: 1 }}>
			<Stack space={4} style={{ flex: 1, alignItems: 'center' }}>
				{userObject && userObject.avatar_url && (
					<Avatar
						source={{
							uri: userObject.avatar_url,
						}}
						width={64}
					/>
				)}
				<Stack space={1}>
					<Text numberOfLines={1} center>
						{userObject.full_name}
					</Text>
					<Text small numberOfLines={1} color="accents_6" center>
						@{userObject.username}
					</Text>
				</Stack>
				<Badge
					{...(userObject.admin
						? {
							bg: 'success',
							color: 'foreground',
						  }
						: {
							bg: 'accents_4',
							color: 'foreground',
						  })}
				>
					{userObject.admin ? 'Admin' : 'Team'}
				</Badge>
			</Stack>
		</Card>
	);
};

const UserCard = ({ userObject, onPress, buttonText, buttonLoading }) => {
	return (
		<Stack space={4}>
			<Box>
				<UserCardInfo userObject={userObject} />
			</Box>
			<Button loading={buttonLoading} onPress={onPress}>
				{buttonText}
			</Button>
		</Stack>
	);
};

UserCard.propTypes = {
	index: PropTypes.number,
	signIntoAccount: PropTypes.func,
	userObject: PropTypes.any,
	onPress: PropTypes.func,
	buttonText: PropTypes.string,
	buttonLoading: PropTypes.bool,
};

UserCard.defaultProps = {
	index: 0,
	signIntoAccount: () => {},
	userObject: {},
	onPress: () => {},
	buttonText: 'Invite to team',
	buttonLoading: false,
};

export { UserCard, UserCardInfo, UserAvatarNameUsername };
