// ---------------------------------------------------------------------------
// REST seam.
//
// Every service in this directory goes through here to reach the Laravel API.
// Nothing else in the app talks to the network.
//
// The API answers in one envelope:
//   { success: true,  data: ..., message: "..." }
//   { success: false, message: "...", errors: { field: ["..."] } }
//
// `data` is unwrapped here, so services see the payload and never the wrapper.
// ---------------------------------------------------------------------------

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api"
).replace(/\/$/, "");

/**
 * Where the bearer token lives.
 *
 * localStorage is the right home for it here: the API is on a different origin
 * to this app, so a same-site cookie is not available to it, and the token has
 * to survive a page reload for the session to persist. It is the only auth
 * state the client keeps — everything else now comes from the server.
 */
const TOKEN_KEY = "classroom-tz:token";

let authToken: string | null = null;
let tokenLoaded = false;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function setAuthToken(token: string | null): void {
  authToken = token;
  tokenLoaded = true;
  if (!isBrowser()) return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // A full or blocked storage quota must not break signing in.
  }
}

export function getAuthToken(): string | null {
  if (!tokenLoaded && isBrowser()) {
    try {
      authToken = window.localStorage.getItem(TOKEN_KEY);
    } catch {
      authToken = null;
    }
    tokenLoaded = true;
  }
  return authToken;
}

export class ApiError extends Error {
  status: number;
  /** Laravel's field-keyed validation errors, when the response carried any. */
  errors: Record<string, string[]>;

  constructor(message: string, status: number, errors: Record<string, string[]> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }

  /** The first field-level message, which is what a form wants to show. */
  get firstFieldMessage(): string | null {
    const first = Object.values(this.errors)[0];
    return Array.isArray(first) && first.length > 0 ? first[0] : null;
  }
}

interface Envelope<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: { raw?: boolean } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };

  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    // Let the browser set the multipart boundary itself.
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError(
      "Couldn't reach the server. Check your connection and try again.",
      0,
    );
  }

  let json: Envelope<T> | null = null;
  if (res.status !== 204) {
    try {
      json = (await res.json()) as Envelope<T>;
    } catch {
      json = null;
    }
  }

  if (!res.ok) {
    const message =
      json?.message || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, json?.errors ?? {});
  }

  if (options.raw) return json as unknown as T;
  return (json ? json.data : undefined) as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
  /** Resolves to the whole envelope rather than just `data`. */
  envelope: <T>(method: string, path: string, body?: unknown) =>
    request<T>(method, path, body, { raw: true }),
};

/**
 * Turns any thrown error into the `{ message }` shape the screens render.
 * Field-level validation messages win, because they say what to fix.
 */
export function toServiceError(error: unknown, fallback: string): { message: string } {
  if (error instanceof ApiError) {
    return { message: error.firstFieldMessage ?? error.message ?? fallback };
  }
  return { message: fallback };
}
