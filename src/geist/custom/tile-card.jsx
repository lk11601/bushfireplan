import React from 'react';
import { Stack } from '@mobily/stacks';
import { Text, Button, Card, Padding, colors } from '@geist';
import { Octicons } from '@expo/vector-icons';

const TileCardIcon = ({ IconType, name }) => {
	return <IconType name={name} size={24} color={colors.accents_4} />;
};

TileCardIcon.defaultProps = {
	IconType: Octicons,
	name: 'people',
};

const TileCard = ({
	IconType,
	iconName,
	text,
	onPress,
	buttonText,
	buttonLoading,
}) => {
	return (
		<Stack space={4}>
			<Card
				p={24}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					aspectRatio: 1.2,
				}}
			>
				<TileCardIcon {...IconType} name={iconName} />
				<Padding pt="4px" />
				<Text
					small
					color="accents_6"
					center
					style={{
						width: '90%',
					}}
				>
					{text}
				</Text>
			</Card>
			<Button loading={buttonLoading} onPress={onPress} type="card">
				{buttonText}
			</Button>
		</Stack>
	);
};

export { TileCard };
