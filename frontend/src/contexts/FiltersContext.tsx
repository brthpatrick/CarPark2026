import React, { createContext, type Dispatch } from "react";
import type { SortOrder } from "../data/car";
import type { Car } from "../models/car";
 
export type Filters = {
    manufacturer: string
}

export type FiltersContextType = {
    filters: Filters;
    page?: number;
    setPage: Dispatch<React.SetStateAction<number | undefined>>;
    limit: number | undefined;
    setLimit: Dispatch<React.SetStateAction<number | undefined>>;
    sort: keyof Car | undefined;
    setSort: Dispatch<React.SetStateAction<keyof Car | undefined>>;
    order: SortOrder;
    setOrder: Dispatch<React.SetStateAction<SortOrder>>;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    updateFilter: (field: keyof Filters, value: string) => void;
    resetFilters: () => void;
    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)
