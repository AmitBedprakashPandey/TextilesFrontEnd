import apiClient from "./config";
import { API_ENDPOINTS } from "./endpoint";

export class ApiService {
    // Generic CRUD operations
    static async getAll<T>(endpoint: string): Promise<T[]> {
        const response = await apiClient.get(endpoint)
        return response.data
    }

    static async getById<T>(endpoint: string): Promise<T> {
        const response = await apiClient.get(endpoint);
        return response.data
    }

    static async create<T>(endpoint: string, data: Partial<T>): Promise<T> {
        const response = await apiClient.post(endpoint, data)
        return response.data
    }

    static async update<T>(endpoint: string, data: Partial<T>): Promise<T> {
        const response = await apiClient.put(endpoint, data)
        return response.data
    }

    static async delete(endpoint: string): Promise<void> {
        await apiClient.delete(endpoint)
    }

}


export const serialNumberApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.SERIALNUMBER.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.SERIALNUMBER.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.SERIALNUMBER.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.SERIALNUMBER.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.SERIALNUMBER.DELETE(id)),
}
