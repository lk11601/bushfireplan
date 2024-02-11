import React from 'react';
import { Image, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { colors } from './colors';

const Avatar = (props) => {
	const { width, styles, source } = props;
	if (source.uri === 'null') {
		return (
			<View
				style={[
					{
						width: width || 64,
						aspectRatio: 1,
						borderRadius: width / 2 || 64,
						backgroundColor: colors.accents_2,
					},
					styles,
				]}
			/>
		);
	} else {
		return (
			<Image
				style={[
					{
						width: width || 64,
						aspectRatio: 1,
						borderRadius: width / 2 || 64,
						backgroundColor: colors.accents_2,
					},
					styles,
				]}
				{...props}
				source={source}
			/>
		);
	}
};

Avatar.propTypes = {
	width: PropTypes.number,
	source: PropTypes.object,
	style: PropTypes.object,
};

Avatar.defaultProps = {
	source: {},
};

export { Avatar };
