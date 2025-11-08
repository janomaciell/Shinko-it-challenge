import { useRuntimeConfig } from 'nuxt/app';

export const useApi = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;
  
    const handleResponse = async <T>(response: Response): Promise<T> => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(error.message || `Error HTTP! estado: ${response.status}`);
      }
      return response.json();
    };
  
    const get = async <T>(endpoint: string): Promise<T> => {
      const response = await fetch(`${baseURL}${endpoint}`);
      return handleResponse<T>(response);
    };
  
    const post = async <T>(endpoint: string, data: any): Promise<T> => {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<T>(response);
    };
  
    const put = async <T>(endpoint: string, data: any): Promise<T> => {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<T>(response);
    };
  
    const del = async <T>(endpoint: string): Promise<T> => {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'DELETE',
      });
      return handleResponse<T>(response);
    };
  
    return {
      get,
      post,
      put,
      delete: del,
    };
  };