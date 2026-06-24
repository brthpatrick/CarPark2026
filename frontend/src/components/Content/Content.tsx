import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { Pagination } from "../Pagination/Pagination"
import { Box, Typography, CircularProgress } from "@mui/material"

export function Content() {
    const { filters } = useFilters()
    const { carsList, isLoading, isError } = useCarsList()

    const filteredCarsList = carsList.filter((car) => {
        return filters.manufacturer === "" ||
            car.manufacturer.includes(filters.manufacturer)
    })

    return (
        <Box sx={{ py: 3 }}>
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