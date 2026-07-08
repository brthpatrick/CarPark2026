import { Box, Typography, Button, Paper } from "@mui/material"
import { useFilters } from "../../hooks/useFilters"
import { useNavigate } from "react-router-dom"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import ElectricCarIcon from "@mui/icons-material/ElectricCar"
import StarIcon from "@mui/icons-material/Star"
import type { SvgIconComponent } from "@mui/icons-material"


const PROMOS: { title: string; description: string; color: string; icon: SvgIconComponent; type: 'sale' | 'electric' | 'premium' }[] = [
    {
        icon: LocalOfferIcon,
        title: "Summer Sale!",
        description: "Up to 20% off on selected cars this month only.",
        color: "#1565c0",
        type: 'sale'
    },
    {
        icon: ElectricCarIcon,
        title: "Electric Special",
        description: "Best deals on electric vehicles - save the planet and your wallet.",
        color: "#2e7d32",
        type: 'electric'
    },
    {
        icon: StarIcon,
        title: "Premium Selection",
        description: "Luxury cars available at competitive prices. Limited stock!",
        color: "#f57c00",
        type: 'premium'
    },
]


export function PromoBanner() {
    const { resetFilters, updateFilter } = useFilters()
    const navigate = useNavigate()

    const handlePromo = (type: 'sale' | 'electric' | 'premium') => {
        resetFilters()
        if (type === 'electric') updateFilter('fuelType', 'Electric')
        if (type === 'sale') updateFilter('priceMax', '15000')
        if (type === 'premium') updateFilter('priceMin', '75000')
        navigate('/')
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            {PROMOS.map((promo, i) => (
                <Paper
                    key={i}
                    sx={{
                        flex: '1 1 250px',
                        minWidth: 0,
                        p: 2.5,
                        background: promo.color,
                        color: '#fff',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <promo.icon fontSize="medium" />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {promo.title}
                        </Typography>
                    </Box>
                    <Typography variant="body2">
                        {promo.description}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handlePromo(promo.type)}
                        sx={{ color: '#fff', borderColor: '#fff', alignSelf: 'flex-start', mt: 1 }}
                    >
                        Browse deals
                    </Button>
                </Paper>
            ))}
        </Box>
    )
}
