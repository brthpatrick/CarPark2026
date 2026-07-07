import type { Car } from "../models/car"
import { apiHandle, HEADERS } from "./helper"
import { API_BASE_URL } from "./constants"


export type SortOrder = 'asc' | 'desc'

export type GetCarsParams = {
    sort?: keyof Car
    order?: SortOrder
    page?: number
    limit?: number
    filters?: Partial<Record<keyof Car, string>>
}

export type Paginated<T> = {
    items: T[]
    total: number
    page: number | undefined
    limit: number | undefined
    totalPages: number
}

/**
 * Gets cars with optional partial-match filtering, sorting and pagination
 * (json-server `<field>_like`, `_sort`/`_order`, `_page`/`_limit`).
 * @param params - filtering, sorting and pagination options
 * @returns A page of cars plus pagination metadata
 */
export async function getCars(params: GetCarsParams = {}): Promise<Paginated<Car>> {
    const { sort, order = 'asc', page, limit, filters = {} } = params

    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== '') {
            query.set(`${key}_like`, value)
        }
    }

    if (sort) {
        query.set('_sort', sort)
        query.set('_order', order)
    }
    
    if (page !== undefined) {
        query.set('_page', String(page))
    }

    if (limit !== undefined) {
        query.set('_limit', String(limit))
    }

    const res = await fetch(`${API_BASE_URL}/cars?${query.toString()}`)
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`)
    }

    const items = (await res.json()) as Car[]
    const total = Number(res.headers.get('X-Total-Count') ?? items.length)
    const totalPages = limit && limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1

    return { items, total, page, limit, totalPages }
}

/**
 * Creates a new car
 * @param car - New car data
 * @returns The created car
 */

export async function createCar(car: Car): Promise<Car> {
    const res = await fetch(`${API_BASE_URL}/cars`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(car),
    })
    return apiHandle<Car>(res)
}

/**
 * Updates a car partially
 * @param car - Partial car data to update
 * @returns The updated car
 */
export async function updateCar(car: Partial<Car>): Promise<Car> {
    const res = await fetch(`${API_BASE_URL}/cars/${car.vin}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify(car),
    })
    return apiHandle<Car>(res)
}

/**
 * Replaces a car completely
 * @param car - New car data
 * @returns The updated car
 */
export async function replaceCar(car: Car): Promise<Car> {
    const res = await fetch(`${API_BASE_URL}/cars/${car.vin}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(car),
    })
    return apiHandle<Car>(res)
}

/**
 * Deletes a car by VIN
 * @param vin - Vehicle Identification Number of the car to delete
 */
export async function deleteCar(vin: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/cars/${vin}`, { method: 'DELETE', headers: HEADERS })
    if (!res.ok) {
        throw new Error(`Delete failed: ${res.status} ${res.statusText}`)
    }
}

export type SearchCarsParams = GetCarsParams & {
    yearMin?: string; yearMax?: string
    priceMin?: string; priceMax?: string
}

export async function searchCars(params: SearchCarsParams = {}): Promise<Paginated<Car>> {
    const { sort, order = 'asc', page, limit, filters = {}, yearMin, yearMax, priceMin, priceMax } = params
    const query = new URLSearchParams()

    if (filters.manufacturer) query.set('manufacturer', filters.manufacturer)
    if (filters.model) query.set('model', filters.model)
    if (filters.fuelType) query.set('fuelType', filters.fuelType)
    if (filters.gearbox) query.set('gearbox', filters.gearbox)
    if (yearMin) query.set('yearMin', yearMin)
    if (yearMax) query.set('yearMax', yearMax)
    if (priceMin) query.set('priceMin', priceMin)
    if (priceMax) query.set('priceMax', priceMax)
    if (sort) { query.set('_sort', sort); query.set('_order', order) }
    if (page !== undefined) query.set('_page', String(page))
    if (limit !== undefined) query.set('_limit', String(limit))

    const res = await fetch(`${API_BASE_URL}/cars/search?${query.toString()}`)
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`)
    return res.json()
}

