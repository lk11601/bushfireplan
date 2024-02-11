import React from 'react';
import { Input } from './input';

export const TextArea = () => {
	return <Input multiline={true} style={{ height: 200, lineHeight: 28 }} />;
};
