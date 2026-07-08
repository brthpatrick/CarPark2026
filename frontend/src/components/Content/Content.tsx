import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { useFavorites } from "../../hooks/useFavorites"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { PromoBanner } from "../PromoBanner/PromoBanner"
import { Pagination } from "../Pagination/Pagination"
import { Box, Typography, CircularProgress } from "@mui/material"

export function Content() {
    const { filters, showFavoritesOnly } = useFilters()
    const { carsList, total, isLoading, isError } = useCarsList()
    const { isFavorite } = useFavorites()

    const filteredCarsList = carsList.filter((car) => {
        if (showFavoritesOnly && !isFavorite(car)) {
            return false
        }
        if (filters.manufacturer !== "" &&
            !car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())) {
            return false
        }

        if (filters.model !== "" &&
            !car.model.toLowerCase().includes(filters.model.toLowerCase())) {
            return false
        }

        if (filters.fuelType !== "" && car.fuelType !== filters.fuelType) {
            return false
        }

        if (filters.gearbox !== "" && car.gearbox !== filters.gearbox) {
            return false
        }

        if (filters.yearMin !== "" && car.constructionYear < Number(filters.yearMin)) {
            return false
        }

        if (filters.yearMax !== "" && car.constructionYear > Number(filters.yearMax)) {
            return false
        }

        if (filters.priceMin !== "" && car.price < Number(filters.priceMin)) {
            return false
        }

        if (filters.priceMax !== "" && car.price > Number(filters.priceMax)) {
            return false
        }

        return true
    })

    return (
        <Box sx={{ py: 3 }}>
            <PromoBanner />
            <FiltersPanel />
            <SortingPanel />

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Typography color="error" sx={{ textAlign: 'center', py: 4 }}>
                    Something went wrong
                </Typography>
            )}

            {!isLoading && !isError && (
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, px: 1 }}>
                        Showing {filteredCarsList.length} of {total} cars
                    </Typography>
                    <Pagination />
                    {filteredCarsList.map((car) => (
                        <CarItem key={car.vin} car={car} />
                    ))}
                    <Pagination />
                </Box>
            )}
        </Box>
    )
}