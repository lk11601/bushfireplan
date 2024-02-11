import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const devCreds = {
	supabaseUrl: 'https://ihlkmhopizazbbyuzech.supabase.co',
	supabaseAnonKey:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobGttaG9waXphemJieXV6ZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQyMDg1NDYsImV4cCI6MTk4OTc4NDU0Nn0.R0T_5yXGNsPFP57f9wDEjnezAK8Pb9H8Oa3HZpVzQHc',
};

export const prodCreds = {
	supabaseUrl: 'https://pnpxujbpxebhxktequjx.supabase.co',
	supabaseAnonKey:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucHh1amJweGViaHhrdGVxdWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMTk1ODMsImV4cCI6MTk5ODU5NTU4M30.BbuIDZ1C2YQ2PuTdW3h_RDjEDal8g45rsVQORBo73fA',
};

const supabase = createClient(
	prodCreds.supabaseUrl,
	prodCreds.supabaseAnonKey,
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	}
);

export default supabase;