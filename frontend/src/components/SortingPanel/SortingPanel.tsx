import { useFilters } from "../../hooks/useFilters"
import type { Car } from "../../models/car";
import { Paper, FormControl, InputLabel, Select, MenuItem, IconButton, } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SORT_FIELDS: { value: keyof Car | "", label: string }[] = [
    { value: "", label: "Default" },
    { value: "manufacturer", label: "Manufacturer" },
    { value: "model", label: "Model" },
    { value: "constructionYear", label: "Construction Year" },
    { value: "mileage", label: "Mileage" },
    { value: "price", label: "Price" },
    { value: "power", label: "Power" },
]

const PAGE_SIZES = [5, 10, 20, 50]

export function SortingPanel() {
    const { sort, setSort, order, setOrder, limit, setLimit, setPage } = useFilters()

    return (
        <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    value={sort ?? ""}
                    label="Sort by"
                    onChange={(e) => {
                        const val = e.target.value as keyof Car | ""
                        setSort(val === "" ? undefined : val)
                    }}
                >
                    {SORT_FIELDS.map((field) => (
                        <MenuItem key={field.value} value={field.value}>
                            {field.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <IconButton
                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                disabled={!sort}
                color="primary"
            >
                {order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Per page</InputLabel>
                <Select
                    value={limit ?? ""}
                    label="Per page"
                    onChange={(e) => {
                        const val = Number(e.target.value)
                        setLimit(val || undefined)
                        setPage(1)
                    }}
                >
                    {PAGE_SIZES.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    )
}