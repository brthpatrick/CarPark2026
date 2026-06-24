
import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { Filters, FiltersContextType } from "./FiltersContext";
import { FiltersContext } from "./FiltersContext";
import type { SortOrder } from "../data/car";
import type { Car } from "../models/car";

const defaultFilters: Filters = {
    manufacturer: "",
    model: "",
    fuelType: "",
    gearbox: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
}

export function FiltersProvider({ children }: PropsWithChildren) {
    const [filters, setFilters] = useState<Filters>(defaultFilters)

    const [page, setPage] = useState<number | undefined>(1)
    const [limit, setLimit] = useState<number | undefined>(25)
    const [sort, setSort] = useState<keyof Car | undefined>()
    const [order, setOrder] = useState<SortOrder>('asc')


    const updateFilter = (field: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const resetFilters = () => setFilters(defaultFilters)
    
    const context: FiltersContextType = {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        page,
        setPage,
        limit,
        setLimit,
        sort,
        setSort,
        order,
        setOrder,
        showFavoritesOnly: false, 
        handleFavoritesToggle: () => {}
    }

    return (
        <FiltersContext.Provider value={context}>
            {children}
        </FiltersContext.Provider>
    )
}