-- ============================================================================
-- KRISHIMITRA (PRARAMBHA 2.0) — FARMER ACCOUNTS SEED DATA
-- ============================================================================

insert into farmer_accounts (
  farmer_id,
  full_name,
  email,
  phone,
  password_hash,
  village,
  district,
  state,
  total_land_acres,
  preferred_language,
  role
) values 
  (
    'MH-PUN-042',
    'Shivaji Patil',
    'shivaji.patil@krishimitra.in',
    '+91 98221 44520',
    crypt('farmer2026', gen_salt('bf')),
    'Baramati',
    'Pune',
    'Maharashtra',
    12.5,
    'mr',
    'farmer'
  ),
  (
    'AGRI-OFFICER-01',
    'Dr. Rajesh Kulkarni',
    'rajesh.kulkarni@krishimitra.in',
    '+91 94220 11234',
    crypt('officer2026', gen_salt('bf')),
    'Shivaji Nagar',
    'Pune',
    'Maharashtra',
    0.0,
    'en',
    'officer'
  ),
  (
    'MH-SOL-018',
    'Sunita Deshmukh',
    'sunita.deshmukh@krishimitra.in',
    '+91 97654 32109',
    crypt('farmer2026', gen_salt('bf')),
    'Pandharpur',
    'Solapur',
    'Maharashtra',
    8.0,
    'mr',
    'farmer'
  )
on conflict (farmer_id) do update set
  full_name = excluded.full_name,
  password_hash = excluded.password_hash,
  updated_at = now();
