import { API_BASE_URL } from "../config/apiEndpoints";

const TOKEN_STORAGE_KEY = "nafiu_auth_token";

export function getStoredToken(): string | null {
  return (
    localStorage.getItem(TOKEN_STORAGE_KEY) ||
    sessionStorage.getItem(TOKEN_STORAGE_KEY)
  );
}

export function saveStoredToken(token: string | null, rememberMe = true): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  if (!token) return;
  if (rememberMe) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

function resolveUrl(endpointOrPath: string): string {
  if (/^https?:\/\//i.test(endpointOrPath)) {
    return endpointOrPath;
  }
  const normalizedPath = endpointOrPath.startsWith("/")
    ? endpointOrPath
    : `/${endpointOrPath}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiRequest<T>(
  endpointOrPath: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(resolveUrl(endpointOrPath), {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success === false) {
    throw new Error(
      payload?.error || payload?.message || `Request failed (${response.status})`
    );
  }

  return payload as T;
}
