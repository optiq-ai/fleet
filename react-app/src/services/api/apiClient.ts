import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Konfiguracja bazowa dla axios
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

// Interfejs dla opcji konfiguracyjnych API
export interface ApiClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Klasa klienta API
class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(options: ApiClientOptions = {}) {
    this.client = axios.create({
      baseURL: options.baseURL || API_BASE_URL,
      timeout: options.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Dodanie interceptora dla żądań
    this.client.interceptors.request.use(
      (config) => {
        // Dodanie tokenu do nagłówka, jeśli istnieje
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Dodanie interceptora dla odpowiedzi
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Obsługa błędów autoryzacji
        if (error.response && error.response.status === 401) {
          // Wylogowanie użytkownika lub odświeżenie tokenu
          this.clearToken();
          // Przekierowanie do strony logowania
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Metoda do ustawienia tokenu
  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Metoda do usunięcia tokenu
  public clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Metoda do pobrania tokenu z localStorage przy inicjalizacji
  public loadToken(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.token = token;
    }
  }

  // Metoda do wykonania żądania GET
  public async get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, {
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Metoda do wykonania żądania POST
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Metoda do wykonania żądania PUT
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Metoda do wykonania żądania DELETE
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Metoda do obsługi błędów
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Eksport instancji klienta API
export const apiClient = new ApiClient();
export default apiClient;
