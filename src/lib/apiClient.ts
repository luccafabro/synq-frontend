import {
  CreateFrequencyDto,
  CreateMembershipDto,
  CreateMessageDto,
  CreateUserDto,
  FrequencyDto,
  MembershipDto,
  MessageDto,
  ResponseDTO,
  RoleDto,
  UpdateFrequencyDto,
  UpdateUserDto,
  UserDto,
} from "@/lib/types.ts";

const API_BASE_URL: string = (import.meta as any).env.VITE_API_BASE_URL ?? "http://localhost:8083";

let authToken: string | null = null;

export class AuthError extends Error {
  constructor(message = "Sessão expirada. Faça login novamente.") {
    super(message);
    this.name = "AuthError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(path, API_BASE_URL);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, signal } = options;

  let authToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjYVZGY0lLOWlKTExOeUxQRTlVRmRMMFdxYzdfak5zOEZrWlFZbW1IdGlVIn0.eyJleHAiOjE3NjQ4OTYxMTEsImlhdCI6MTc2NDg5NTgxMSwianRpIjoib25ydHJvOjViMTY1NDk4LTE2ZTItYzZmMS00ZWIyLWJkNWVmMTkxNDM3MiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTAwMy9yZWFsbXMvc3lucSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiJjMWUwNmM4ZC1hZDMzLTQxYzgtYjg5ZS0zZDYyNDAxODkyZDIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzeW5xLWFwaSIsInNpZCI6IjMyNWIxYTkwLWNmMDUtZjdjOS1hNzMwLTg4YTg0MzNiZmE4MyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm93bmVyIiwicmVhbG1fYWNjZXNzb2ZmbGluZV9hY2Nlc3MiLCJvZmZsaW5lX2FjY2VzcyIsInJlYWxtX2FjY2Vzc293bmVyIiwicmVhbG1fYWNjZXNzdW1hX2F1dGhvcml6YXRpb24iLCJyZWFsbV9hY2Nlc3NkZWZhdWx0LXJvbGVzLXN5bnEiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtc3lucSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwic3lucS1hcGkiOnsicm9sZXMiOlsiYXBpX2FkbWluIiwiYXBpX3VzZXIiXX0sImJyb2tlciI6eyJyb2xlcyI6WyJyZWFkLXRva2VuIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1hcHBsaWNhdGlvbnMiLCJ2aWV3LWNvbnNlbnQiLCJ2aWV3LWdyb3VwcyIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwibWFuYWdlLWNvbnNlbnQiLCJkZWxldGUtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQWRtaW4gQWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4ZW1wbGUuY29tIn0.qEabbM_CfGx9JGa4iQ8Fyx6BteIAOgYrCwMrOR_UoVSSOBS7xOko_-em7wZs3HN3KtDw4GlzkQgXcDsjFDIXPgTbSYs6IiqW01FJiTjjQE5JVKOqkWvfRv8rrVQ3xMqTaDoYnqr_xfATc3dTDZtXeLZFRfzJjhuHvlUDtCVgPYUKfrr8I3PykRLAjLUkG8v1Dm_S44rK0TaJmweZoCiCxiIXuGT4cqynXrrzT6cr-RPYiecm3Kx6wug5ZgQLUJ8T18QWBxk4OTCyyKS3XKSHnmX0EtpvqgJftbLkx4KgXnROiN9Llhj1n6nr8ugXPDVDO8HdV9nN7ZcjJFJeB3TuOg";

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (body != null) {
    headers["Content-Type"] = "application/json";
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    signal,
  });

  if (response.status === 401) {
    throw new AuthError();
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const message = (payload as any)?.message || `Erro de API (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}

export const apiClient = {
  // Users
  getUserById(id: number) {
    return request<ResponseDTO<UserDto>>(`/api/users/${id}`);
  },
  getUserByUsername(username: string) {
    return request<ResponseDTO<UserDto>>(`/api/users/username/${encodeURIComponent(username)}`);
  },
  getAllUsers() {
    return request<ResponseDTO<UserDto[]>>("/api/users");
  },
  createUser(body: CreateUserDto) {
    return request<ResponseDTO<UserDto>>("/api/users", { method: "POST", body });
  },
  updateUser(id: number, body: UpdateUserDto) {
    return request<ResponseDTO<UserDto>>(`/api/users/${id}`, { method: "PUT", body });
  },
  deleteUser(id: number) {
    return request<ResponseDTO<Record<string, unknown>>>(`/api/users/${id}`, { method: "DELETE" });
  },

  // Roles
  getAllRoles() {
    return request<ResponseDTO<RoleDto[]>>("/api/roles");
  },

  // Frequencies
  getAllFrequencies() {
      console.log("Fetching all frequencies from API");
    return request<ResponseDTO<FrequencyDto[]>>("/api/frequencies");
  },
  createFrequency(body: CreateFrequencyDto) {
    return request<ResponseDTO<FrequencyDto>>("/api/frequencies", { method: "POST", body });
  },
  getFrequencyById(id: number) {
    return request<ResponseDTO<FrequencyDto>>(`/api/frequencies/${id}`);
  },
  updateFrequency(id: number, body: UpdateFrequencyDto) {
    return request<ResponseDTO<FrequencyDto>>(`/api/frequencies/${id}`, { method: "PUT", body });
  },
  deleteFrequency(id: number) {
    return request<ResponseDTO<Record<string, unknown>>>(`/api/frequencies/${id}`, { method: "DELETE" });
  },
  getFrequencyBySlug(slug: string) {
    return request<ResponseDTO<FrequencyDto>>(`/api/frequencies/slug/${encodeURIComponent(slug)}`);
  },

  // Messages
  getMessages(frequencyId: number, page = 0, size = 50) {
    return request<ResponseDTO<MessageDto[]>>(`/api/frequencies/${frequencyId}/messages`, {
      query: { page, size },
    });
  },
  postMessage(frequencyId: number, body: Omit<CreateMessageDto, "frequencyId">) {
    return request<ResponseDTO<MessageDto>>(`/api/frequencies/${frequencyId}/messages`, {
      method: "POST",
      body: { ...body, frequencyId },
    });
  },

  // Members
  getMembers(frequencyId: number) {
    return request<ResponseDTO<MembershipDto[]>>(`/api/frequencies/${frequencyId}/members`);
  },
  addMember(frequencyId: number, body: Omit<CreateMembershipDto, "frequencyId">) {
    return request<ResponseDTO<MembershipDto>>(`/api/frequencies/${frequencyId}/members`, {
      method: "POST",
      body: { ...body, frequencyId },
    });
  },
};

export type ApiClient = typeof apiClient;
