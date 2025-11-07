import { supabase } from '../lib/supabaseClient';
import { CONFIG } from '../config/constants';
import { Note } from '../models/Note';

type NoteRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const mapRowToNote = (row: NoteRow): Note => ({
  id: row.id,
  title: row.title,
  content: row.content,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const noteService = {
  async getAll(): Promise<Note[]> {
    const { data, error } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapRowToNote);
  },

  async getById(id: string): Promise<Note | null> {
    const { data, error } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? mapRowToNote(data) : null;
  },

  async create(payload: { title: string; content: string }): Promise<Note> {
    const { data, error } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .insert({
        title: payload.title,
        content: payload.content
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return mapRowToNote(data);
  },

  async update(id: string, payload: { title?: string; content?: string }): Promise<Note | null> {
    const updates: Partial<Pick<NoteRow, 'title' | 'content'>> = {};
    if (payload.title !== undefined) {
      updates.title = payload.title;
    }
    if (payload.content !== undefined) {
      updates.content = payload.content;
    }

    const { data, error } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? mapRowToNote(data) : null;
  },

  async delete(id: string): Promise<Note | null> {
    const { data, error } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? mapRowToNote(data) : null;
  },

  async deleteAll(): Promise<number> {
    const { error, count } = await supabase
      .from(CONFIG.SUPABASE_NOTES_TABLE)
      .delete({ count: 'exact' })
      .neq('id', '');

    if (error) {
      throw error;
    }

    return count ?? 0;
  }
};


