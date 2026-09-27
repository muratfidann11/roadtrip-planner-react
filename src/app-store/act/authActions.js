import { supabase } from "../cns/supebase.js";

export async function signInAnonymous() {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  return data;
}
