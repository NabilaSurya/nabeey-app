-- ============================================================
-- MIGRATION: Fitur Point Loyalty & Belanja + Booking Guest
-- Tabel untuk mencatat transaksi belanja yang butuh ACC admin
-- ============================================================

-- 1. TABEL TRANSACTIONS (Belanja Member & Booking Guest)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    estimated_points INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    -- Kolom untuk Guest Booking (nullable untuk member)
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    check_in DATE,
    check_out DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL REWARDS_REDEMPTION (Riwayat Penukaran Poin)
CREATE TABLE IF NOT EXISTS rewards_redemption (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reward_type TEXT NOT NULL,
    reward_title TEXT NOT NULL,
    points_spent INTEGER NOT NULL,
    status TEXT DEFAULT 'Processed' CHECK (status IN ('Processed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ALTER TABLE untuk database yang sudah ada (tambahkan kolom guest booking)
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS guest_email TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS guest_phone TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS check_in DATE;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS check_out DATE;

-- Tambahkan kolom yang hilang di tabel profiles (dibutuhkan oleh AuthContext, diskon member, poin, dll)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Bronze';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member';

-- 4. ROW LEVEL SECURITY POLICIES (perbaiki error "violates row-level security policy")
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards_redemption ENABLE ROW LEVEL SECURITY;

-- Policy: Izinkan INSERT untuk siapa saja (guest booking & member checkout)
DROP POLICY IF EXISTS "transactions_insert_policy" ON transactions;
CREATE POLICY "transactions_insert_policy" ON transactions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Izinkan SELECT untuk authenticated users (melihat data sendiri)
DROP POLICY IF EXISTS "transactions_select_own" ON transactions;
CREATE POLICY "transactions_select_own" ON transactions
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Izinkan SELECT untuk admin (lihat semua transaksi)
DROP POLICY IF EXISTS "transactions_select_admin" ON transactions;
CREATE POLICY "transactions_select_admin" ON transactions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Izinkan UPDATE hanya untuk admin (cek dari tabel profiles)
DROP POLICY IF EXISTS "transactions_update_policy" ON transactions;
CREATE POLICY "transactions_update_policy" ON transactions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: rewards_redemption - insert & select untuk user sendiri
DROP POLICY IF EXISTS "rewards_insert_policy" ON rewards_redemption;
CREATE POLICY "rewards_insert_policy" ON rewards_redemption
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "rewards_select_own" ON rewards_redemption;
CREATE POLICY "rewards_select_own" ON rewards_redemption
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. ROW LEVEL SECURITY POLICIES UNTUK TABEL PROFILES
-- (Tanpa ini, JOIN dari transactions ke profiles akan gagal dengan error 403)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Izinkan admin SELECT semua profil (dibutuhkan untuk JOIN & subquery)
DROP POLICY IF EXISTS "profiles_select_admin" ON profiles;
CREATE POLICY "profiles_select_admin" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Izinkan admin UPDATE profil (untuk menambah poin)
DROP POLICY IF EXISTS "profiles_update_admin" ON profiles;
CREATE POLICY "profiles_update_admin" ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Izinkan user melihat profilnya sendiri
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Izinkan user mengupdate profilnya sendiri
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Izinkan INSERT untuk trigger handle_new_user (via service_role)
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT
  WITH CHECK (true);

-- 6. INDEX untuk performa query
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_rewards_redemption_user_id ON rewards_redemption(user_id);
