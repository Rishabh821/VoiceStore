-- Create the businesses table for VoiceStore website publishing
create table if not exists public.businesses (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    business_name text not null,
    business_type text,
    phone text,
    hours text,
    address text,
    
    business_data jsonb not null default '{}'::jsonb,
    selected_variant integer not null default 1
);

-- Enable Row Level Security (RLS)
alter table public.businesses enable row level security;

-- Create policies to allow public reads and inserts (no authentication required as per requirements)
create policy "Allow public read access"
    on public.businesses for select
    using (true);

create policy "Allow public insert access"
    on public.businesses for insert
    with check (true);
