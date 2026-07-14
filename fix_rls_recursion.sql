-- ============================================================
-- SOLUSI PALING SEDERHANA: Disable RLS di tabel bermasalah
-- 
-- Infinite recursion terjadi karena policy di tabel profiles
-- melakukan SELECT dari profiles itu sendiri.
-- 
-- Nonaktifkan RLS di semua tabel yang punya policy rekursif.
-- ============================================================

-- Disable RLS di tabel profiles (sumber rekursi)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Disable RLS di tabel transactions (juga kena dampak)
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- Hapus semua policy yang bermasalah di tabel profiles
DROP POLICY IF EXISTS "profiles_select_admin" ON profiles CASCADE;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles CASCADE;
DROP POLICY IF EXISTS "profiles_update_admin" ON profiles CASCADE;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles CASCADE;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles CASCADE;

-- Hapus policy di transactions yang refer ke profiles
DROP POLICY IF EXISTS "transactions_select_admin" ON transactions CASCADE;
DROP POLICY IF EXISTS "transactions_update_policy" ON transactions CASCADE;

-- ============================================================
-- SETELAH INI, jalankan juga query untuk update role admin
-- ============================================================
-- UPDATE public.profiles SET role = 'admin' 
-- WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@gmail.com');
