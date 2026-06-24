import { useFilters } from '../../hooks/useFilters';
import { TextField, FormControlLabel, Checkbox, Paper, Typography,
    Box, FormControl, InputLabel, Select, MenuItem, Button, } from '@mui/material';


const FUEL_TYPES = ['', 'Petrol', 'Diesel', 'Electric', 'Hybrid']
const GEARBOX_TYPES = ['', 'Manual', 'Automatic']

export function FiltersPanel () {
    const { filters, updateFilter, resetFilters, showFavoritesOnly, handleFavoritesToggle } = useFilters();

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Filters
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                    label="Manufacturer"
                    variant="outlined"
                    size="small"
                    value={filters.manufacturer}
                    onChange={(e) => updateFilter('manufacturer', e.target.value)}
                />
                <TextField
                    label="Model"
                    variant="outlined"
                    size="small"
                    value={filters.model}
                    onChange={(e) => updateFilter('model', e.target.value)}
                />

                <FormControl size="small">
                    <InputLabel>Fuel type</InputLabel>
                    <Select
                        value={filters.fuelType}
                        label="Fuel type"
                        onChange={(e) => updateFilter('fuelType', e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {FUEL_TYPES.filter(f => f !== '').map((fuel) => (
                            <MenuItem key={fuel} value={fuel}>{fuel}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Gearbox</InputLabel>
                    <Select
                        value={filters.gearbox}
                        label="Gearbox"
                        onChange={(e) => updateFilter('gearbox', e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {GEARBOX_TYPES.filter(g => g !== '').map((gb) => (
                            <MenuItem key={gb} value={gb}>{gb}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Year from"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={filters.yearMin}
                    onChange={(e) => updateFilter('yearMin', e.target.value)}
                />
                <TextField
                    label="Year to"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={filters.yearMax}
                    onChange={(e) => updateFilter('yearMax', e.target.value)}
                />

                <TextField
                    label="Price from (EUR)"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => updateFilter('priceMin', e.target.value)}
                />
                <TextField
                    label="Price to (EUR)"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => updateFilter('priceMax', e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showFavoritesOnly}
                            onChange={(e) => handleFavoritesToggle(e.target.checked)}
                        />
                    }
                    label="Show only favorites"
                />
                <Button variant="outlined" color="error" size="small" onClick={resetFilters}>
                    Reset filters
                </Button>
            </Box>
        </Paper>
    )
}