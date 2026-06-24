import React, { createContext, type Dispatch } from "react";

export type Filters = {
    manufacturer: string
}

export type FiltersContextType = {
    filters: Filters;
    page?: number;
    setPage: Dispatch<React.SetStateAction<number | undefined>>;
    limit: number | undefined;
    setLimit: Dispatch<React.SetStateAction<number | undefined>>;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    updateFilter: (field: keyof Filters, value: string) => void;
    resetFilters: () => void;
    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)
