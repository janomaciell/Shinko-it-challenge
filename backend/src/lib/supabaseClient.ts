import { createClient } from '@supabase/supabase-js';
import { CONFIG } from '../config/constants';

if (!CONFIG.SUPABASE_URL) {
  throw new Error('SUPABASE_URL no está configurado. Define la variable de entorno SUPABASE_URL.');
}

if (!CONFIG.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurado. Define la variable de entorno SUPABASE_SERVICE_ROLE_KEY.');
}

export const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'X-Client-Info': 'notes-backend'
    }
  }
});


