import { useFilters } from '../../hooks/useFilters';
import {
    TextField, FormControlLabel, Checkbox, Chip, Typography,
    Box, FormControl, InputLabel, Select, MenuItem, Button,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCarsList } from '../../hooks/useCarsList';

const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
const GEARBOX_TYPES = ['Manual', 'Automatic']

export function FiltersPanel() {
    const { filters, updateFilter, resetFilters, showFavoritesOnly, handleFavoritesToggle } = useFilters();
    const { total } = useCarsList();

    return (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6">Filters</Typography>
                    <Chip label={total} size="small" color="primary" />
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <TextField
                        label="Manufacturer" variant="outlined" size="small"
                        value={filters.manufacturer}
                        onChange={(e) => updateFilter('manufacturer', e.target.value)}
                    />
                    <TextField
                        label="Model" variant="outlined" size="small"
                        value={filters.model}
                        onChange={(e) => updateFilter('model', e.target.value)}
                    />

                    <FormControl size="small">
                        <InputLabel>Fuel type</InputLabel>
                        <Select value={filters.fuelType} label="Fuel type"
                            onChange={(e) => updateFilter('fuelType', e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {FUEL_TYPES.map((fuel) => (
                                <MenuItem key={fuel} value={fuel}>{fuel}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel>Gearbox</InputLabel>
                        <Select value={filters.gearbox} label="Gearbox"
                            onChange={(e) => updateFilter('gearbox', e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {GEARBOX_TYPES.map((gb) => (
                                <MenuItem key={gb} value={gb}>{gb}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField label="Year from" variant="outlined" size="small" type="number"
                        value={filters.yearMin}
                        onChange={(e) => {
                            const val = e.target.value
                            updateFilter('yearMin', val)
                            if (filters.yearMax && Number(filters.yearMax) <= Number(val))
                                updateFilter('yearMax', '')
                        }}
                        slotProps={{ htmlInput: { min: 1900, max: new Date().getFullYear() } }}
                    />
                    <TextField label="Year to" variant="outlined" size="small" type="number"
                        value={filters.yearMax}
                        onChange={(e) => updateFilter('yearMax', e.target.value)}
                        error={!!filters.yearMin && !!filters.yearMax && Number(filters.yearMax) <= Number(filters.yearMin)}
                        helperText={!!filters.yearMin && !!filters.yearMax && Number(filters.yearMax) <= Number(filters.yearMin) ? `Must be greater than ${filters.yearMin}` : ''}
                        slotProps={{ htmlInput: { min: filters.yearMin ? Number(filters.yearMin) + 1 : 1900, max: new Date().getFullYear() } }}
                    />

                    <TextField label="Price from (EUR)" variant="outlined" size="small" type="number"
                        value={filters.priceMin}
                        onChange={(e) => {
                            const val = e.target.value
                            updateFilter('priceMin', val)
                            if (filters.priceMax && Number(filters.priceMax) <= Number(val))
                                updateFilter('priceMax', '')
                        }}
                        slotProps={{ htmlInput: { min: 0 } }}
                    />
                    <TextField label="Price to (EUR)" variant="outlined" size="small" type="number"
                        value={filters.priceMax}
                        onChange={(e) => updateFilter('priceMax', e.target.value)}
                        error={!!filters.priceMin && !!filters.priceMax && Number(filters.priceMax) <= Number(filters.priceMin)}
                        helperText={!!filters.priceMin && !!filters.priceMax && Number(filters.priceMax) <= Number(filters.priceMin) ? `Must be greater than ${Number(filters.priceMin).toLocaleString()} EUR` : ''}
                        slotProps={{ htmlInput: { min: filters.priceMin ? Number(filters.priceMin) + 1 : 0 } }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={showFavoritesOnly}
                                onChange={(e) => handleFavoritesToggle(e.target.checked)} />
                        }
                        label="Show only favorites"
                    />
                    <Button variant="outlined" color="error" size="small" onClick={resetFilters}>
                        Reset filters
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
