-- ============================================================
-- LUXSTAY CRM - FULL DATABASE MIGRATION
-- Execute this entire script in Supabase SQL Editor
-- ============================================================

-- 1. ENUM TYPES
CREATE TYPE user_role AS ENUM ('admin', 'member');
CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold', 'Platinum');
CREATE TYPE room_status AS ENUM ('Tersedia', 'Terisi', 'Maintenance');
CREATE TYPE booking_status AS ENUM ('Pending', 'Confirmed', 'Checked_In', 'Checked_Out', 'Cancelled');

-- 2. TABEL PROFILES (Ekstensi Supabase Auth Users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'member'::user_role,
    tier member_tier DEFAULT 'Bronze'::member_tier,
    points INT DEFAULT 0 CHECK (points >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABEL KAMAR
CREATE TABLE rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_number TEXT UNIQUE NOT NULL,
    room_type TEXT NOT NULL,
    price_per_night NUMERIC(12, 2) NOT NULL CHECK (price_per_night >= 0),
    status room_status DEFAULT 'Tersedia'::room_status,
    image_url TEXT,
    facilities TEXT[],
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABEL RESERVASI / BOOKING
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE RESTRICT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    status booking_status DEFAULT 'Pending'::booking_status,
    potential_points INT GENERATED ALWAYS AS (FLOOR(total_price / 100000) * 10) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT check_dates CHECK (check_out_date > check_in_date)
);

-- 5. TRIGGER: Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, tier, points)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Tamu Luxstay'),
    'member',
    'Bronze',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. SEED DATA: Sample Rooms (10 kamar)
INSERT INTO rooms (room_number, room_type, price_per_night, status, image_url, facilities, description) VALUES
('RM-001', 'Deluxe', 1200000, 'Tersedia', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
  ARRAY['AC & Pemanas', 'Wi-Fi 100 Mbps', 'TV Layar Datar 50"', 'Mini Bar', 'Bathtub Marmer', 'Balkon Pribadi'],
  'Kamar Deluxe dengan pemandangan laut yang menakjubkan. Dilengkapi dengan balkon pribadi, TV layar datar 50 inci, dan kamar mandi marmer dengan bathtub.'),
('RM-002', 'Suite', 2500000, 'Tersedia', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Ruang Tamu Terpisah', 'Butler Service', 'Access Executive Lounge', 'Wi-Fi 200 Mbps', 'Espresso Machine', 'Smart TV 65"'],
  'Suite eksekutif dengan ruang tamu terpisah, akses ke Executive Lounge, dan pemandangan kota yang spektakuler.'),
('RM-003', 'Superior', 800000, 'Tersedia', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2070&auto=format&fit=crop',
  ARRAY['AC & Pemanas', 'Wi-Fi Gratis', 'TV Layar Datar 40"', 'Kamar Mandi Shower', 'Meja Kerja', 'Coffee & Tea Maker'],
  'Kamar Superior dengan dua tempat tidur single yang nyaman. Cocok untuk kolega atau teman.'),
('RM-004', 'Penthouse', 5500000, 'Tersedia', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Kolam Renang Pribadi', 'Ruang Keluarga', 'Dapur Lengkap', 'Private Chef', 'Home Theater', 'Terrace Luas'],
  'Penthouse mewah di lantai tertinggi dengan pemandangan 360° kota.'),
('RM-005', 'Deluxe', 2200000, 'Tersedia', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop',
  ARRAY['2 Kamar Terhubung', 'Ruang Bermain Anak', '2 Kamar Mandi', 'Kulkas & Microwave', 'Smart TV 2 Unit', 'Wi-Fi 150 Mbps'],
  'Dua kamar terhubung yang sempurna untuk keluarga.'),
('RM-006', 'Villa', 3500000, 'Tersedia', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Kolam Renang Pribadi', 'Gazebo & Garden', 'Area BBQ', 'Dapur Mini', 'Parkir Mobil', 'Wi-Fi 200 Mbps'],
  'Villa pribadi di tengah taman tropis yang asri.'),
('RM-007', 'Superior', 550000, 'Tersedia', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
  ARRAY['AC', 'Wi-Fi Gratis', 'TV Layar Datar 32"', 'Kamar Mandi Shower', 'Meja Kerja', 'Safety Box'],
  'Kamar standar nyaman dengan harga terjangkau.'),
('RM-008', 'Suite', 3200000, 'Tersedia', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Canopy King Bed', 'Bathtub for 2', 'Bunga Segar Harian', 'Spa Bath Set', 'Smart TV 55"', 'Private Balcony'],
  'Suite romantis untuk momen spesial Anda.'),
('RM-009', 'Superior', 650000, 'Tersedia', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Akses Kursi Roda', 'Handrail Kamar Mandi', 'Tombol Darurat', 'AC & Pemanas', 'TV Layar Datar', 'Wi-Fi Gratis'],
  'Kamar ramah difabel dengan akses kursi roda.');

-- 7. RLS: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES

-- PROFILES
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ROOMS (Public Read)
CREATE POLICY "Public read rooms"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert rooms"
  ON rooms FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update rooms"
  ON rooms FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete rooms"
  ON rooms FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- BOOKINGS
CREATE POLICY "Members can insert own bookings"
  ON bookings FOR INSERT
  WITH CHECK (
    auth.uid() = member_id
  );

CREATE POLICY "Members can read own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = member_id);

CREATE POLICY "Admins can read all bookings"
  ON bookings FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update bookings"
  ON bookings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
