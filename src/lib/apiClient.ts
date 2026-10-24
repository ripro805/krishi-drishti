/**
 * KrishiDrishti Unified API Client
 * Connects the Next.js frontend with backend authentication, scan history, feedback, and admin services.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "/api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  public getToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("KRISHI_DRISHTI_AUTH_TOKEN");
    } catch {
      return null;
    }
  }

  public setToken(token: string | null) {
    if (typeof window === "undefined") return;
    try {
      if (token) {
        localStorage.setItem("KRISHI_DRISHTI_AUTH_TOKEN", token);
      } else {
        localStorage.removeItem("KRISHI_DRISHTI_AUTH_TOKEN");
      }
    } catch {
      // ignore
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || data.error || `HTTP ${response.status}: Request failed`;
      throw new Error(errorMsg);
    }

    return data as T;
  }

  public get<T = any>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  public post<T = any>(endpoint: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public patch<T = any>(endpoint: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public delete<T = any>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }

  public feedback = {
    submit: (data: {
      scanId: string;
      crop: string;
      disease: string;
      banglaDisease?: string;
      confidence: number;
      rating: "accurate" | "inaccurate" | "unsure";
      comment?: string;
      userName?: string;
    }) => this.post<{ feedback: any; message: string }>("/feedback", data),

    getList: (params?: { status?: string; rating?: string }) => {
      const query = new URLSearchParams();
      if (params?.status && params.status !== "all") query.set("status", params.status);
      if (params?.rating && params.rating !== "all") query.set("rating", params.rating);
      const qs = query.toString();
      return this.get<{ feedbackList: any[]; stats: any }>(`/feedback${qs ? `?${qs}` : ""}`);
    },

    updateStatus: (id: string, status: "new" | "reviewed" | "flagged") =>
      this.patch<{ feedback: any; message: string }>(`/feedback/${id}`, { status }),
  };
}

export const apiClient = new ApiClient(API_BASE_URL);
