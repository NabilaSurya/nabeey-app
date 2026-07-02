import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

// Diskon per tier member
export const DISCOUNT_RATES = {
  Bronze: 0,       // 0%
  Silver: 0.1,     // 10%
  Gold: 0.15,      // 15%
  Platinum: 0.2,   // 20%
};

// Guest user default (belum login)
const GUEST_STATE = {
  isLoggedIn: false,
  role: "guest",
  id: null,
  name: "Tamu",
  email: null,
  tier: null,
  points: 0,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(GUEST_STATE);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId, retries = 2) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Retry jika trigger database belum selesai (race condition)
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchProfile(userId, retries - 1);
        }

        // Gagal fetch profil — tetap sebagai GUEST, jangan auto-login
        console.warn("Fetch profile gagal, tetap sebagai guest:", error.message);
        return;
      }

      setUser({
        isLoggedIn: true,
        role: data.role,
        id: data.id,
        name: data.full_name,
        email: null, // email dikelola oleh auth, bukan tabel profiles
        tier: data.tier,
        points: data.points,
      });
    } catch (err) {
      // Gagal fetch profil — tetap sebagai GUEST, jangan auto-login
      console.warn("Fetch profile exception, tetap sebagai guest:", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      try {
        const { data: { session: currentSession }, error } =
          await supabase.auth.getSession();

        if (error) throw error;

        if (!isMounted) return;
        setSession(currentSession);

        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setUser(GUEST_STATE);
        }
      } catch (err) {
        console.error("Session init error:", err);
        if (isMounted) setUser(GUEST_STATE);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!isMounted) return;
        setSession(currentSession);

        if (currentSession?.user) {
          // setTimeout hindari deadlock di Supabase JS client
          setTimeout(() => fetchProfile(currentSession.user.id), 0);
        } else {
          setUser(GUEST_STATE);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, fullName) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(GUEST_STATE);
      setSession(null);
    }
    return { error };
  };

  const getDiscountedPrice = (originalPrice) => {
    if (!user.tier) return originalPrice;
    const rate = DISCOUNT_RATES[user.tier] || 0;
    return Math.round(originalPrice * (1 - rate));
  };

  const value = {
    user,
    session,
    loading,
    isGuest: !user.isLoggedIn,
    isMember: user.isLoggedIn && user.role === "member",
    isAdmin: user.isLoggedIn && user.role === "admin",
    getDiscountedPrice,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
