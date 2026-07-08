import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { searchCars } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";

export function CarListProvider({ children }: PropsWithChildren) {
    const { filters, page, limit, sort, order, showFavoritesOnly } = useFilters()

    const [carsList, setCarsList] = useState<Car[]>([])
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getCarList = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const result = await searchCars({
                filters: {
                    manufacturer: filters.manufacturer,
                    model: filters.model,
                    fuelType: filters.fuelType,
                    gearbox: filters.gearbox,
                },
                yearMin: filters.yearMin,
                yearMax: filters.yearMax,
                priceMin: filters.priceMin,
                priceMax: filters.priceMax,
                page: showFavoritesOnly ? undefined : page,
                limit: showFavoritesOnly ? undefined : limit,
                sort,
                order,
            })
            setCarsList(result.items)
            setTotalPages(result.totalPages)
            setTotal(result.total)
        } catch {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCarList()
    }, [filters, page, limit, sort, order])

    return (
        <CarListContext.Provider value={{ carsList, total,totalPages, isError, isLoading }}>
            {children}
        </CarListContext.Provider>
    )
}