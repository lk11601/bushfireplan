import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import supabase from '../../../database/client';
import {
	Input,
	InputField,
	Button,
	ButtonText,
	FormControlLabel,
	FormControlLabelText,
	Text,
	Heading,
} from '@gluestack-ui/themed';
import { getUserId } from '@/util/data';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [teamData, setTeamData] = useState();
	const [userId, setUserId] = useState();

	const fetchData = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { id } = user;
		setUserId(id);
		const { data, error } = await supabase
			.from('teams')
			.select()
			.contains('members', [id])
			.single();
		if (data) {
			setTeamData(data);
		} else {
			error && error.code !== 'PGRST116' && console.error(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const teamOwner = teamData && teamData.owner === userId;

	return (
		<>
			{!loading && (
				<ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						style={{ flex: 1 }}
					>
						{teamOwner ? (
							<TeamOwner teamData={teamData} setTeamData={setTeamData} />
						) : teamData ? (
							<></>
						) : (
							<NoTeamYet fetchData={fetchData} />
						)}
					</TouchableWithoutFeedback>
				</ScrollView>
			)}
		</>
	);
};

const NoTeamYet = ({ fetchData }) => {
	const [teamName, setTeamName] = useState('');
	const createTeam = async () => {
		const id = await getUserId();
		const { data, error } = await supabase
			.from('teams')
			.insert([{ owner: id, name: teamName, members: [id] }])
			.select();
		if (data) {
			fetchData();
		}
		error && console.error(error);
	};

	return (
		<View style={{ padding: 16, gap: 16 }}>
			<Text>
				It looks you are not part of a team yet. Please either create a team or
				ask a team owner to add you to their team.
			</Text>
			<Heading>Create team</Heading>
			<Input>
				<InputField
					value={teamName}
					onChangeText={setTeamName}
					placeholder="Enter the name of your new team"
				/>
			</Input>
			<Button onPress={createTeam}>
				<ButtonText>Create team</ButtonText>
			</Button>
		</View>
	);
};

const TeamOwner = ({ teamData, setTeamData }) => {
	const [teamName, setTeamName] = useState(teamData.name);

	const teamNameSame = teamName === teamData.name;

	const changeTeamName = async () => {
		const { data, error } = await supabase
			.from('teams')
			.update({ name: teamName })
			.eq('id', teamData.id)
			.select()
			.single();
		if (data) {
			setTeamData(data);
		} else {
			error && console.error(error);
		}
	};

	return (
		<View style={{ flex: 1, padding: 16, gap: 16 }}>
			<View>
				<FormControlLabel mb="$2">
					<FormControlLabelText>Name</FormControlLabelText>
				</FormControlLabel>
				<Input>
					<InputField value={teamName} onChangeText={setTeamName}></InputField>
				</Input>
			</View>
			<Button
				variant="solid"
				action="secondary"
				isDisabled={teamNameSame}
				onPress={changeTeamName}
			>
				<ButtonText>Change team name</ButtonText>
			</Button>
			<TeamMembers teamData={teamData} />
		</View>
	);
};

const TeamMembers = ({ teamData }) => {
	const [newUsername, setNewUsername] = useState('');
	const [memberProfiles, setMemberProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const { members } = teamData;

	const fetchData = async () => {
		const { data, error } = await supabase
			.from('users')
			.select()
			.in('id', members);
		if (data) {
			setMemberProfiles(data);
		}
		error && console.error(error);
		setLoading(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from('users')
				.select()
				.in('id', members);
			if (data) {
				setMemberProfiles(data);
			}
			error && console.error(error);
			setLoading(false);
		};

		fetchData();
	}, []);

	const addUserToTeam = async () => {
		// get user id from username
		const { data: newUserData, error } = await supabase
			.from('users')
			.select('id')
			.eq('username', newUsername.toLowerCase())
			.single();

		if (newUserData) {
			const newMembers = [...members, newUserData.id];
			const { error } = await supabase
				.from('teams')
				.update({ members: newMembers })
				.eq('id', teamData.id);
			error && console.error(error);
		}
		setNewUsername('');
		await fetchData();
		error && console.error(error);
		return;
	};

	return (
		<>
			{!loading && (
				<>
					<Heading size="sm">{`Members (${memberProfiles.length})`}</Heading>
					{memberProfiles.map((member, index) => (
						<View
							key={index}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 8,
							}}
						>
							<Text>{member.full_name}</Text>
							{/* <Button
								size="md"
								variant="outline"
								action="negative"
								isDisabled={false}
								isFocusVisible={false}
							>
								<ButtonText>Remove</ButtonText>
							</Button> */}
						</View>
					))}
					<Heading size="sm">Add member by username</Heading>
					<Input>
						<InputField
							value={newUsername}
							onChangeText={setNewUsername}
							placeholder="Enter username"
						/>
					</Input>
					<Button
						variant="solid"
						action="secondary"
						isDisabled={!newUsername.length}
						onPress={addUserToTeam}
					>
						<ButtonText>Add member</ButtonText>
					</Button>
				</>
			)}
		</>
	);
};

export default App;
