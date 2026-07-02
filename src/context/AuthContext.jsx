import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const defaultUser = {
  isLoggedIn: false,
  role: "guest", // "guest" | "member" | "admin"
  name: "Ahmad Dani",
  tier: "Silver",
  points: 1450,
};

// Diskon per tier member
export const DISCOUNT_RATES = {
  Silver: 0.1,   // 10%
  Gold: 0.15,    // 15%
  Platinum: 0.2, // 20%
  Diamond: 0.25, // 25%
};

// Status kamar untuk admin (contoh per ID kamar)
const roomStatusMap = {
  "RM-001": "Tersedia",
  "RM-002": "Terisi",
  "RM-003": "Tersedia",
  "RM-004": "Maintenance",
  "RM-005": "Tersedia",
  "RM-006": "Terisi",
  "RM-007": "Tersedia",
  "RM-008": "Tersedia",
  "RM-009": "Tersedia",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const switchRole = (role) => {
    setUser({
      ...defaultUser,
      isLoggedIn: role !== "guest",
      role,
    });
  };

  const logout = () => {
    setUser(defaultUser);
  };

  const value = {
    user,
    isGuest: user.role === "guest",
    isMember: user.role === "member",
    isAdmin: user.role === "admin",
    getRoomStatus: (roomId) => roomStatusMap[roomId] || "Tersedia",
    getDiscountedPrice: (originalPrice) => {
      const rate = DISCOUNT_RATES[user.tier] || 0;
      return Math.round(originalPrice * (1 - rate));
    },
    switchRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
