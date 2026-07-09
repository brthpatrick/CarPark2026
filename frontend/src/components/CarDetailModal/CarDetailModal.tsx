import type { Car } from "../../models/car"
import { IMG_BASE_URL } from "../../data/constants"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    Chip,
    Divider,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

type Props = {
    car: Car | null
    onClose: () => void
}

export function CarDetailModal({ car, onClose }: Props) {
    if (!car) return null

    const equipments = car.equipment.split(",")

    return (
        <Dialog open={!!car} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {car.manufacturer} {car.model}
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2 }}>
                    <Box
                        component="img"
                        src={`${IMG_BASE_URL}/${car.image}`}
                        alt={`${car.manufacturer} ${car.model}`}
                        sx={{ width: { xs: '100%', sm: 300 }, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" color="success.main" sx={{ fontWeight: 700, mb: 2 }}>
                            {car.price.toLocaleString()} €
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                            <Typography variant="body1"><b>Year:</b> {car.constructionYear}</Typography>
                            <Typography variant="body1"><b>Fuel:</b> {car.fuelType}</Typography>
                            <Typography variant="body1"><b>Mileage:</b> {car.mileage} km</Typography>
                            <Typography variant="body1"><b>Engine:</b> {car.engineSize}</Typography>
                            <Typography variant="body1"><b>Power:</b> {car.power} hp</Typography>
                            <Typography variant="body1"><b>Gearbox:</b> {car.gearbox}</Typography>
                            <Typography variant="body1" sx={{ gridColumn: { sm: '1 / -1' } }}>
                                <b>VIN:</b> {car.vin}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ mb: 1 }}>Description</Typography>
                <Typography variant="body2" sx={{ mb: 2 }} >
                    {car.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ mb: 1 }}>Equipment</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {equipments.map((eq, i) => (
                        <Chip key={i} label={eq.trim()} size="small" variant="outlined" />
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
                        
    )
}