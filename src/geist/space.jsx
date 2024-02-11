import React from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export const Space = styled.View`
	width: ${(props) => props.w || '0px'};
	height: ${(props) => props.h || '0px'};
`;

export const Padding = styled.View`
	padding: ${(props) => props.p || '0px'};
	padding-top: ${(props) => props.pt || '0px'};
	padding-bottom: ${(props) => props.pb || '0px'};
	padding-left: ${(props) => props.pl || '0px'};
	padding-right: ${(props) => props.pr || '0px'};
`;

export const Margin = styled.View`
	margin: ${(props) => props.m || '0px'};
	margin-top: ${(props) => props.mt || '0px'};
	margin-bottom: ${(props) => props.mb || '0px'};
	margin-left: ${(props) => props.ml || '0px'};
	margin-right: ${(props) => props.mr || '0px'};
`;

export const Inset = (props) => {
	const { t } = props;
	const { top, bottom } = useSafeAreaInsets();
	return (
		<View
			style={{
				height: t ? top : bottom,
			}}
		/>
	);
};
