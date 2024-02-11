import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import { Pressable, Animated, View } from 'react-native';
import { colors } from './colors';
import { Loading } from './loading';

const ButtonWrapper = (props) => {
	const { children, onPress } = props;
	return (
		<TouchableScale
			friction={90}
			activeScale={0.95}
			onPress={onPress}
			tension={100}
			{...props}
			onPressIn={() => {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			}}
		>
			{children}
		</TouchableScale>
	);
};

/*
Possible props:
Ghost
Colors: Success (blue), Warning, Error, Link, Filled
*/

const Button = (props) => {
	const {
		children,
		onPress,
		loading,
		type,
		// ghost,
		// shadow,
		// disabled,
		// icon,
		// iconRight,
	} = props;
	// button should be a pressable component with an animated view (that has an animated text inside it) that animate when the button is being pressed
	const buttonTextColour = React.useRef(new Animated.Value(0)).current;
	const buttonBorderColour = React.useRef(new Animated.Value(0)).current;
	// write a function that animates the button when it is pressed
	const animateButton = (toValue) => {
		Animated.parallel([
			Animated.timing(buttonTextColour, {
				toValue,
				duration: 100,
				useNativeDriver: false,
			}),
			Animated.timing(buttonBorderColour, {
				toValue,
				duration: 100,
				useNativeDriver: false,
			}),
		]).start();
	};

	const propsConfig = {
		card: {
			backgroundColor: colors.accents_1,
			borderColor: colors.accents_3,
			color: colors.accents_6,
			fontFamily: 600,
		},
		default: {
			backgroundColor: colors.background,
			borderColor: colors.accents_3,
			color: colors.accents_5,
		},
		secondary: {
			backgroundColor: colors.foreground,
			borderColor: colors.accents_3,
			color: colors.background,
		},
		success: {
			backgroundColor: colors.success,
			borderColor: colors.success,
			color: colors.foreground,
		},
	};

	const getBackgroundColor = () => {
		// look for the type prop in the propsConfig object
		// if it exists, return the backgroundColor
		// if it doesn't exist, return the default backgroundColor
		return (
			propsConfig[type]?.backgroundColor || propsConfig.default.backgroundColor
		);
	};

	const getBorderColor = () => {
		return propsConfig[type]?.borderColor || propsConfig.default.borderColor;
	};

	const getTextColor = () => {
		return propsConfig[type]?.color || propsConfig.default.color;
	};

	// const getFontWeight = () => {
	// 	return (
	// 		(propsConfig[type]?.fontFamily &&
	// 			`Inter${propsConfig[type]?.fontFamily}`) ||
	// 		propsConfig.default.fontFamily
	// 	);
	// };

	return (
		<Pressable
			unstable_pressDelay={50}
			onPress={onPress}
			onPressIn={() => {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				animateButton(1);
			}}
			onPressOut={() => {
				animateButton(0);
			}}
			hitSlop={10}
			disabled={loading}
		>
			{loading ? (
				<View
					style={{
						borderColor: colors.accents_4,
						height: 45,
						borderWidth: 1,
						borderRadius: 6,
						backgroundColor: getBackgroundColor(),
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Loading />
				</View>
			) : (
				<Animated.View
					style={{
						borderColor: buttonBorderColour.interpolate({
							inputRange: [0, 1],
							outputRange: [getBorderColor(), colors.foreground],
						}),
						borderWidth: 1,
						borderRadius: 6,
						backgroundColor: getBackgroundColor(),
						alignItems: 'center',
						justifyContent: 'center',
						height: 45,
					}}
				>
					<Animated.Text
						style={{
							color: buttonTextColour.interpolate({
								inputRange: [0, 1],
								outputRange: [getTextColor(), colors.foreground],
							}),
							fontSize: 18,
							lineHeight: 40,
						}}
					>
						{children}
					</Animated.Text>
				</Animated.View>
			)}
		</Pressable>
	);
};

export { ButtonWrapper, Button };
