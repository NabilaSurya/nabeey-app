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
        .maybeSingle();

      // Helper: fallback ke session user (dipakai jika profile tdk ditemukan atau error)
      const fallbackToSession = async () => {
        const { data: { user: sessionUser } } = await supabase.auth.getUser();
        const storedRole = localStorage.getItem("userRole") || "member";
        if (sessionUser) {
          setUser({
            isLoggedIn: true,
            role: storedRole,
            id: sessionUser.id,
            name: sessionUser.user_metadata?.full_name || "Member",
            email: sessionUser.email,
            tier: "Bronze",
            points: 0,
          });
        }
        setLoading(false);
      };

      if (error) {
        // Error query beneran (bukan "no rows found") — retry dulu
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchProfile(userId, retries - 1);
        }
        // Retry habis — fallback
        console.warn("Fetch profile gagal, fallback ke session:", error.message);
        await fallbackToSession();
        return;
      }

      if (!data) {
        // Profile tdk ada di database — fallback tanpa retry
        console.warn("Profile tidak ditemukan di DB, fallback ke session");
        await fallbackToSession();
        return;
      }

      // Profile ditemukan!
      setUser({
        isLoggedIn: true,
        role: data.role || localStorage.getItem("userRole") || "member",
        id: data.id,
        name: data.full_name,
        email: null,
        tier: data.tier || "Bronze",
        points: data.points ?? 0,
      });
      setLoading(false);
    } catch (err) {
      console.warn("Fetch profile exception, fallback ke session:", err);
      await fallbackToSession();
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
        setLoading(true); // Aktifkan loading selagi fetch profil

        if (currentSession?.user) {
          // setTimeout hindari deadlock di Supabase JS client
          setTimeout(() => fetchProfile(currentSession.user.id), 0);
        } else {
          setUser(GUEST_STATE);
          setLoading(false);
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
