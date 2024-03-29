module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@': './src/',
						'@src': './src/',
						'@components': './src/components',
						'@geist': './src/geist/geist',
						'@db': './src/database/database',
						'@pages': './src/pages',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
