import { supabase } from './src/lib/supabase';

// Ejecuta esto en el SQL Editor de Supabase:
/*
create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid not null,
  role text not null check (role in ('user', 'bot')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security
alter table public.chat_messages enable row level security;

-- Políticas para permitir a los visitantes (anon) chatear
create policy "Permitir insertar" on public.chat_messages for insert to anon with check (true);
create policy "Permitir leer" on public.chat_messages for select to anon using (true);

-- Habilitar Realtime para esta tabla (¡Importante!)
alter publication supabase_realtime add table public.chat_messages;
*/
