import supabase from '@/database/client';
import { greenToast } from './toasts';

export const getUserId = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { id } = user;
	return id;
};

export const fetchTeamId = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { id } = user;
	const { data, error } = await supabase
		.from('teams')
		.select('id')
		.contains('members', [id])
		.single();
	if (data) {
		return data.id;
	} else {
		error && error.code !== 'PGRST116' && console.error(error);
	}
};

export const changeName = async (text) => {
	const id = await getUserId();
	
	const { error } = await supabase
		.from('users')
		.update({ full_name: text })
		.eq('id', id);
	error && console.error(error);
};

export const changeUsername = async (text) => {
	const id = await getUserId();
	const { error } = await supabase
		.from('users')
		.update({ username: text })
		.eq('id', id);	
	error && console.error(error);
};

export const removeProfilePicture = async () => {
	const { error } = await supabase.from('users').upsert({
		avatar_url: '',
	});
	if (error) {
		console.error(error);
	} else {
		greenToast('Profile picture removed');
	}
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
	} else {
		console.log('signed out');
	}
};

/*
getShapes: async ({ projectId }) => {
				
				const { data, error } = await supabase
					.from('shapes')
					.select('*')
					.eq('project_id', projectId);
				if (error) {
					
				} else if (data) {
					
					set({ shapes: data });
				}
			},
			signOut: async () => {
				const { error } = await supabase.auth.signOut();
				if (error) {
					
				} else {
					set({
						userAuth: {},
						userData: {},
						userLoading: false,
						teamChangeLoading: false,
						projects: [],
					});
				}
			},
						getAllUsers: async () => {
				const { data, error } = await supabase
					.from('users')
					.select('*')
					.order('admin', { ascending: false });
				if (error) {
					console.error('error', 'ERROR: SELECT USER PAGE');
				} else {
					set({ users: data });
				}
			},

			//Function - Get shapes
			

			//Function - Get all projects
			getAllProjects: async () => {
				const teamId = await fetchTeamId();
				
				if (teamId) {
					const { data, error } = await supabase
						.from('projects')
						.select('*')
						.eq('owner_id', teamId)
						.order('created_at', { ascending: false });
					if (error) {
						
					} else {
						
						set({ projects: data });
					}
				}
			},

			//Function - Create project
			createProject: async ({ projectName, region }) => {
				
				const teamId = await fetchTeamId();
				const { data, error } = await supabase
					.from('projects')
					.insert([
						{
							owner_id: teamId || get().userData.id,
							name: projectName,
							region: JSON.stringify(region),
						},
					])
					.select('*');
				if (error) {
					console.error('error', error);
				} else {
					
				}
			},

			//Function - Delete project by id
			deleteProject: async ({ projectId }) => {
				
				const { data, error } = await supabase
					.from('projects')
					.delete()
					.match({ id: projectId })
					.select('*');
				if (error) {
					console.error('error', error);
				} else {
					
				}
			},

			//Function - Update profile picture
			updateProfilePicture: async ({ base64 }) => {
				set({ profilePictureUpdateLoading: true });
				const { data, error } = await supabase.storage
					.from('profile-pic')
					.upload('new-pfps2.jpg', decode(base64), {
						contentType: 'image/jpg',
					});
				if (error) {
					
					Alert.alert('Error', 'Something went wrong. Please try again later.');
					set({ profilePictureUpdateLoading: false });
				} else {
					
					set({ profilePictureUpdateLoading: false });
				}
			},

			//Function - Change team
			changeTeam: async (userId, teamName, teamMembers) => {
				set({ teamChangeLoading: true });
				const { data, error } = await supabase
					.from('users')
					.upsert({
						id: userId,
						team_name: teamName,
						team_members: teamMembers,
					})
					.select('*')
					.single();
				if (error) {
					
				} else {
					
					set({ userData: data });
					set({ teamChangeLoading: false });
				}
			},

			//Function - Change team name
			changeTeamName: async (teamName) => {
				const userId = get().userData.id;
				const { data, error } = await supabase
					.from('users')
					.upsert({
						id: userId,
						team_name: teamName,
					})
					.select('*')
					.single();
				if (error) {
					
				} else {
					
					set({ userData: data });
				}
			},
			*/



