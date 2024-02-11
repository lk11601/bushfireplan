import styled from 'styled-components/native';
import { colors } from '@geist';

const ToggleButton = styled.View`
	background-color: ${colors.accents_1};
	border: ${(props) =>
		!props.active ? 'none' : `3px solid ${colors.accents_4}}`};
	width: 52px;
	height: 52px;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;

export { ToggleButton };
