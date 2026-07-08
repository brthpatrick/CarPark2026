import { useState } from "react"
import type { Car } from "../../models/car"
import { CarDetailModal } from "../CarDetailModal/CarDetailModal"
import { useFavorites } from "../../hooks/useFavorites"
import { IMG_BASE_URL } from "../../data/constants"
import { Card, CardMedia, CardContent, Typography, Button, Chip, Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useBasket } from "../../hooks/useBasket"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

type Props = {
    car: Car
}

export function CarItem({ car }: Props) {
    const equipments = car.equipment.split(",")
    const { toggleFavorite, isFavorite } = useFavorites()
    const { addToBasket, removeFromBasket, isInBasket } = useBasket()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Card variant="outlined" sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 2, overflow: 'hidden', cursor: 'pointer'
            }} onClick={() => setShowModal(true)}>
                <CardMedia
                    component="img"
                    sx={{ 
                        width: { xs: '100%', sm: 280 },
                        height: { xs: 200, sm: 'auto' },
                        objectFit: 'cover'
                    }}
                    image={`${IMG_BASE_URL}/${car.image}`}
                    alt={`${car.manufacturer} ${car.model}`}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {car.manufacturer} {car.model}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 0.5, my: 1 }}>
                        <Typography variant="body2"><b>Year:</b> {car.constructionYear}</Typography>
                        <Typography variant="body2"><b>Fuel:</b> {car.fuelType}</Typography>
                        <Typography variant="body2"><b>Mileage:</b> {car.mileage} km</Typography>
                        <Typography variant="body2"><b>Engine:</b> {car.engineSize} cm3</Typography>
                        <Typography variant="body2"><b>Power:</b> {car.power} CP</Typography>
                        <Typography variant="body2"><b>Gearbox:</b> {car.gearbox}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {equipments.slice(0, 6).map((eq, i) => (
                            <Chip key={i} label={eq.trim()} size="small" variant="outlined" />
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                            {car.price.toLocaleString()} EUR
                        </Typography>
                        <Button
                            variant={isFavorite(car) ? "contained" : "outlined"}
                            color="error"
                            size="small"
                            startIcon={isFavorite(car) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(car) }}
                        >
                            {isFavorite(car) ? "Remove" : "Favorite"}
                        </Button>
                        <Button
                            variant={isInBasket(car) ? "contained" : "outlined"}
                            color="primary"
                            size="small"
                            startIcon={isInBasket(car) ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
                            onClick={(e) => { e.stopPropagation(); isInBasket(car) ? removeFromBasket(car.vin) : addToBasket(car) }}
                        >
                            {isInBasket(car) ? "Remove" : "Add to cart"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <CarDetailModal car={showModal ? car : null} onClose={() => setShowModal(false)} />
        </>
    )
}