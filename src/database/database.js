import supabase from './client';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const initialStore = {
	users: [],
	usersLoading: false,
	userAuth: {},
	userData: {},
	userLoading: false,
	teamChangeLoading: false,
	team: {},
	profilePictureUpdateLoading: false,
	projects: [],
	shapes: [],
};

export const useStore = create(
	persist(
		(set) => ({
			...initialStore,

			resetStore: () => {
				set(initialStore);
			},
		}),

		{ name: 'useStore', storage: createJSONStorage(() => AsyncStorage) }
	)
);

export { supabase };
