import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MOCK_ADMIN_USER, MOCK_MEMBER_USER } from "../data/mockData";
import { getInitials } from "../lib/format";
import { saveStoredToken } from "../services/apiClient";
import type { AuthUser, UserRole } from "../types/dashboard";

const USER_STORAGE_KEY = "nafiu_auth_user";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSessionFromLogin: (params: {
    apiResponse: Record<string, unknown>;
    fallbackRole: UserRole;
    email: string;
    rememberMe?: boolean;
  }) => AuthUser;
  loginAsDemo: (role: UserRole) => AuthUser;
  updateCurrentUser: (updated: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  const raw =
    localStorage.getItem(USER_STORAGE_KEY) ||
    sessionStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null, rememberMe = true): void {
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
  if (!user) return;
  const serialized = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(USER_STORAGE_KEY, serialized);
  } else {
    sessionStorage.setItem(USER_STORAGE_KEY, serialized);
  }
}

function normalizeRole(rawRole: unknown, fallback: UserRole): UserRole {
  if (typeof rawRole !== "string") return fallback;
  const normalized = rawRole.toLowerCase();
  if (normalized === "admin" || normalized === "administrator") {
    return "administrator";
  }
  if (normalized === "member" || normalized === "user") {
    return "member";
  }
  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const setSessionFromLogin: AuthContextValue["setSessionFromLogin"] = ({
    apiResponse,
    fallbackRole,
    email,
    rememberMe = true,
  }) => {
    const dataObj =
      (apiResponse.data as Record<string, unknown> | undefined) || apiResponse;
    const rawUser =
      (dataObj.user as Record<string, unknown> | undefined) ||
      (apiResponse.user as Record<string, unknown> | undefined) ||
      dataObj;

    const token =
      (dataObj.token as string | undefined) ||
      (dataObj.accessToken as string | undefined) ||
      (apiResponse.token as string | undefined) ||
      (apiResponse.accessToken as string | undefined) ||
      null;

    const role = normalizeRole(rawUser?.role ?? dataObj.role, fallbackRole);
    const template = role === "administrator" ? MOCK_ADMIN_USER : MOCK_MEMBER_USER;

    const firstName =
      (rawUser?.firstName as string | undefined) || template.firstName;
    const lastName =
      (rawUser?.lastName as string | undefined) || template.lastName;

    const normalizedUser: AuthUser = {
      id: (rawUser?.id as string | undefined) || template.id,
      firstName,
      lastName,
      fullName:
        (rawUser?.fullName as string | undefined) ||
        `${firstName} ${lastName}`.trim(),
      email: (rawUser?.email as string | undefined) || email || template.email,
      phone: (rawUser?.phone as string | undefined) || template.phone,
      country: (rawUser?.country as string | undefined) || template.country,
      role,
      memberId:
        role === "member"
          ? (rawUser?.memberId as string | undefined) || template.memberId
          : undefined,
      memberSince:
        (rawUser?.memberSince as string | undefined) || template.memberSince,
      accountCreated:
        (rawUser?.accountCreated as string | undefined) ||
        template.accountCreated,
      passwordLastUpdated: template.passwordLastUpdated,
      avatarInitials: getInitials(firstName, lastName),
    };

    saveStoredToken(token, rememberMe);
    persistUser(normalizedUser, rememberMe);
    setUser(normalizedUser);
    return normalizedUser;
  };

  const loginAsDemo = (role: UserRole): AuthUser => {
    const demoUser =
      role === "administrator" ? { ...MOCK_ADMIN_USER } : { ...MOCK_MEMBER_USER };
    saveStoredToken(null);
    persistUser(demoUser, true);
    setUser(demoUser);
    return demoUser;
  };

  const updateCurrentUser = (updated: AuthUser) => {
    const rememberMe = Boolean(localStorage.getItem(USER_STORAGE_KEY));
    persistUser(updated, rememberMe);
    setUser(updated);
  };

  const logout = () => {
    saveStoredToken(null);
    persistUser(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      setSessionFromLogin,
      loginAsDemo,
      updateCurrentUser,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
