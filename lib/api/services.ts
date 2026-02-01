import { de } from "zod/v4/locales";
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
    updateCurrentNumber: (id: string, data: any) => ApiService.update(API_ENDPOINTS.SERIALNUMBER.UPDATECURRENTNUMVER(id), data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.SERIALNUMBER.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.SERIALNUMBER.DELETE(id)),
}

export const unitApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.UNITS.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.UNITS.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.UNITS.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.UNITS.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.UNITS.DELETE(id)),
}

export const areaApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.AREA.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.AREA.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.AREA.CREATE, data),  
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.AREA.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.AREA.DELETE(id)),
}

export const cityApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.CITY.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.CITY.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.CITY.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.CITY.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.CITY.DELETE(id)),
}

export const vendorApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.VENDOR.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.VENDOR.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.VENDOR.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.VENDOR.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.VENDOR.DELETE(id)),
}

export const vendorCategoryApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.VENDORCATEGORY.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.VENDORCATEGORY.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.VENDORCATEGORY.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.VENDORCATEGORY.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.VENDORCATEGORY.DELETE(id)),
}

export const companyApi = {
    getAll: () => ApiService.getAll(API_ENDPOINTS.COMPANY.GET_ALL),
    getById: (id: string) => ApiService.getById(API_ENDPOINTS.COMPANY.GET_BY_ID(id)),
    create: (data: any) => ApiService.create(API_ENDPOINTS.COMPANY.CREATE, data),
    update: (id: string, data: any) => ApiService.update(API_ENDPOINTS.COMPANY.UPDATE(id), data),
    delete: (id: string) => ApiService.delete(API_ENDPOINTS.COMPANY.DELETE(id)),
}