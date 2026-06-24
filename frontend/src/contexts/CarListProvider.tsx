
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars } from "../data/car";
import type { GetCarsParams } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";


export function CarListProvider({ children }: PropsWithChildren) {

    const { filters, page, limit } = useFilters()

    const [carsList, setCarsList] = useState<Car[]>([])

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getCarList = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const params: GetCarsParams = {
                filters,
                page,
                limit
            }

            const result = await getCars(params)
            setCarsList(result.items)
        } catch {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCarList()
    }, [filters, page, limit])

    const context = {
        carsList,
        isError,
        isLoading
    }

    return (
        <CarListContext.Provider value={context}>
            {children}
        </CarListContext.Provider>
    )
}