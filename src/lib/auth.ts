import { supabase } from "@/lib/supabase";

export const createAdminProfile = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        role: 'admin',
        status: 'active'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error in createAdminProfile:', error);
    throw error;
  }
};

export const checkAdminExists = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('role', 'admin')
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking admin existence:', error);
    throw error;
  }
};

export const adminCredentials = {
  email: "admin@licoreria247.com",
  password: "Patines12345="
};