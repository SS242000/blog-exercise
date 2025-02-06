const VITE_BASE_URL = import.meta.env.VITE_API_VITE_BACKEND_URL;
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiCaller {
  private readonly apiEndPoint: string = VITE_BASE_URL;
  private readonly apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.apiEndPoint + "/api",
      timeout: 10000, // Timeout in milliseconds
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
      },
    });

   
  }

  async get(endpoint: string) {
    try {
      const response = await this.apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(endpoint: string, data: object) {
    try {
      const response = await this.apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(endpoint: string, data: object) {
    try {
      const response = await this.apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(endpoint: string) {
    try {
      const response = await this.apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    console.error('API error occurred:', error);
    
    if (axios.isAxiosError(error)) {
      return new Error(`API request failed with status ${error.response?.status}: ${error.message}`);
    }

    // Generic error handling
    return new Error('API request failed');
  }
}

export default new ApiCaller();
