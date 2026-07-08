import { useBasket } from "../../hooks/useBasket"
import { IMG_BASE_URL } from "../../data/constants"
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Divider,
    Paper,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

export function BasketPage() {
    const { basketItems, removeFromBasket, basketTotal, clearBasket } = useBasket()

    if (basketItems.length === 0) {
        return (
            <Box sx={{ py: 4, textAlign: 'center' }}>
                <RemoveShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400' }} />
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Your cart is empty
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ py: 3, px: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Cart ({basketItems.length} {basketItems.length === 1 ? 'item' : 'items'})
            </Typography>

            {basketItems.map((car) => (
                <Card key={car.vin} variant="outlined" sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    mb: 2, overflow: 'hidden'
                }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: { xs: '100%', sm: 200 },
                            height: { xs: 180, sm: 'auto' },
                            objectFit: 'cover'
                        }}
                        image={`${IMG_BASE_URL}/${car.image}`}
                        alt={`${car.manufacturer} ${car.model}`}
                    />
                    <CardContent sx={{
                        flex: 1, display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 1
                    }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {car.manufacturer} {car.model}
                            </Typography>
                            <Typography variant="body2">
                                {car.constructionYear} | {car.fuelType} | {car.mileage} km | {car.power} CP
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                                {(car.price ?? 0).toLocaleString()} EUR
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => removeFromBasket(car.vin)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 2 }} />

            <Paper sx={{
                p: 2, display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
            }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Total: {basketTotal.toLocaleString()} EUR
                </Typography>
                <Button variant="contained" color="error" onClick={clearBasket}>
                    Clear Cart
                </Button>
            </Paper>
        </Box>
    )
}
