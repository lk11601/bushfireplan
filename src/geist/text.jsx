import React from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';

const TextOld = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	${(props) => props.h2 && 'font-family: Inter700;'}
	font-size: ${(props) =>
		props.b
			? '16px'
			: props.h1
				? '48px'
				: props.h2
					? '36px'
					: props.h3
						? '24px'
						: props.h4
							? '20px'
							: props.h5
								? '16px'
								: props.h6
									? '14px'
									: props.small
										? '14px'
										: props.p
											? '18px'
											: '18px'};
	font-weight: ${(props) =>
		props.b
			? '800'
			: props.h1
				? '900'
				: props.h2
					? '700'
					: props.h3
						? '600'
						: props.h4
							? '600'
							: props.h5
								? '600'
								: props.h6
									? '600'
									: props.small
										? '400'
										: props.p
											? '400'
											: '400'};

	line-height: ${(props) =>
		props.h1
			? '72px'
			: props.h2
				? '54px'
				: props.h3
					? '36px'
					: props.h4
						? '30px'
						: props.h5
							? '24px'
							: props.h6
								? '21px'
								: props.small
									? '21px'
									: props.p
										? '24px'
										: '24px'};
`;

const H1 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 48px;
	line-height: 72px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 900;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const H2 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 36px;
	line-height: 54px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 700;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const H3 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 24px;
	line-height: 36px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 600;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const H4 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 20px;
	line-height: 30px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 600;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const H5 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 16px;
	line-height: 24px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 600;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const H6 = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['accents_6']};
	font-size: 14px;
	line-height: 21px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 600;
	font-style: normal;
	margin: 0;
	padding: 0;
	text-transform: uppercase;
`;

const B = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 16px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 800;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const P = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 18px;
	line-height: 24px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 400;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const Small = styled.Text`
	color: ${(props) =>
		props.color ? colors[props.color] : colors['foreground']};
	font-size: 14px;
	line-height: 21px;
	text-align: ${(props) => (props.center ? 'center' : 'auto')};
	font-weight: 400;
	font-style: normal;
	margin: 0;
	padding: 0;
`;

const Text = (props) => {
	const { h1, h2, h3, h4, h5, h6, b, p, small } = props;
	// return the correct component based on the variant prop
	const variant = h1
		? 'h1'
		: h2
			? 'h2'
			: h3
				? 'h3'
				: h4
					? 'h4'
					: h5
						? 'h5'
						: h6
							? 'h6'
							: b
								? 'b'
								: p
									? 'p'
									: small
										? 'small'
										: 'p';
	switch (variant) {
	case 'h1':
		return <H1 {...props}>{props.children}</H1>;
	case 'h2':
		return <H2 {...props}>{props.children}</H2>;
	case 'h3':
		return <H3 {...props}>{props.children}</H3>;
	case 'h4':
		return <H4 {...props}>{props.children}</H4>;
	case 'h5':
		return <H5 {...props}>{props.children}</H5>;
	case 'h6':
		return <H6 {...props}>{props.children}</H6>;
	case 'b':
		return <B {...props}>{props.children}</B>;
	case 'p':
		return <P {...props}>{props.children}</P>;
	case 'small':
		return <Small {...props}>{props.children}</Small>;
	default:
		return <P {...props}>{props.children}</P>;
	}
};

export { Text, TextOld };
