import { Pagination as MuiPagination, Box } from "@mui/material"
import { useFilters } from "../../hooks/useFilters"
import { useCarsList } from "../../hooks/useCarsList"

export function Pagination() {
    const { page, setPage, limit } = useFilters()
    const { totalPages } = useCarsList()

    if (!limit) return null

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <MuiPagination
                count={totalPages}
                page={page ?? 1}
                onChange={(_e, value) => setPage(value)}
                color="primary"
                shape="rounded"
            />
        </Box>
    )
}