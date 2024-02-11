import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';
import { Inline } from '@mobily/stacks';

const BadgeContainer = styled.View`
	background-color: ${(props) =>
		props.bg
			? colors[props.bg]
			: props.type
				? props.type === 'success'
					? colors['success']
					: props.type === 'error'
						? colors['error']
						: props.type === 'warning'
							? colors['warning']
							: props.type === 'secondary'
								? colors['accents_5']
								: colors['foreground']
				: colors['foreground']};
	padding: 4px 8px;
	width: auto;
	border-radius: 16px;
`;

const BadgeText = styled.Text`
	color: ${(props) =>
		props.color
			? colors[props.color]
			: props.type
				? colors['foreground']
				: colors['background']};
	font-size: 14px;
`;

export const Badge = (props) => {
	return (
		<Inline>
			<BadgeContainer bg={props.bg} type={props.type}>
				<BadgeText color={props.color} type={props.type}>
					{props.children}
				</BadgeText>
			</BadgeContainer>
		</Inline>
	);
};

Badge.propTypes = {
	bg: PropTypes.string,
	children: PropTypes.any,
	color: PropTypes.string,
	type: PropTypes.oneOf(['success', 'error', 'warning', 'secondary']),
};
