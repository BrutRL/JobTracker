import { createContext, useContext } from "react";
import { specificQuery } from "@/tanstack/userTanstack";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: userData, isLoading, isError } = specificQuery();

  const user = userData?.data ?? null;

  return (
    <AuthContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
