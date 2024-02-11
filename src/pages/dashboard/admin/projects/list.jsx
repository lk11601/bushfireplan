import React, { useEffect } from 'react';
import { Stack } from '@mobily/stacks';
import { useStore } from '@db';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, ButtonWrapper } from '@geist';
import { Button, ButtonText } from '@gluestack-ui/themed';

const App = ({ navigation }) => {
	const projects = useStore((state) => state.projects);
	const getAllProjects = useStore((state) => state.getAllProjects);

	useEffect(() => {
		getAllProjects();
	}, []);
	return (
		<ScrollView style={{ flex: 1 }}>
			<Stack padding={4} space={4} paddingTop={6}>
				<Button
					type="success"
					onPress={() => {
						Alert.prompt(
							'Project name',
							null,
							(text) => {
								navigation.navigate('New', {
									projectName: text,
								});
							},
							'plain-text',
							null,
							{ userInterfaceStyle: 'dark' }
						);
					}}
				>
					<ButtonText>Create new project</ButtonText>
				</Button>
				{projects.length > 0 &&
					projects.map((project) => {
						return <ProjectListItem key={project.id} project={project} />;
					})}
			</Stack>
		</ScrollView>
	);
};

const ProjectListItem = ({ project }) => {
	const navigation = useNavigation();
	return (
		<ButtonWrapper
			onPress={() => {
				navigation.navigate('Project', {
					project: project,
				});
			}}
			onLongPress={() => {
				Alert.alert(
					'Delete project',
					'Are you sure you want to delete this project?',
					[
						{
							text: 'Cancel',
							onPress: () => {},
							style: 'cancel',
						},
						{
							text: 'Delete',
							onPress: async () => {
								await useStore.getState().deleteProject({
									projectId: project.id,
								});
								await useStore.getState().getAllProjects();
							},
							style: 'destructive',
						},
					],
					{ cancelable: true }
				);
			}}
		>
			<MapView
				style={{
					aspectRatio: 3,
					borderRadius: 8,
					overflow: 'hidden',
				}}
				legalLabelInsets={{ right: -10000 }}
				userInterfaceStyle="dark"
				mapType="satellite"
				region={JSON.parse(project.region)}
			>
				<LinearGradient
					style={{
						flex: 1,
						padding: 8,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)']}
					// make it horizontal
					start={{ x: 0, y: 0 }}
				>
					<Text h3>{project.name}</Text>
				</LinearGradient>
			</MapView>
		</ButtonWrapper>
	);
};

export default App;
