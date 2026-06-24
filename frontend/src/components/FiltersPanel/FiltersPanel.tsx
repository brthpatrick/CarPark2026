import { useFilters } from '../../hooks/useFilters';
import { TextField, FormControlLabel, Checkbox, Paper, Typography } from '@mui/material';


export function FiltersPanel () {
    const { filters, updateFilter, showFavoritesOnly, handleFavoritesToggle } = useFilters();

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Filters
            </Typography>
            <TextField
                label="Manufacturer"
                variant="outlined"
                size="small"
                fullWidth
                value={filters.manufacturer}
                onChange={(e) => updateFilter("manufacturer", e.target.value)}
                sx={{ mb: 2 }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={showFavoritesOnly}
                        onChange={(e) => handleFavoritesToggle(e.target.checked)}
                    />
                }
                label="Show only favorites"
            />
        </Paper>
    )
}