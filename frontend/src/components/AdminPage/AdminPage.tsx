import { useState, useEffect } from "react"
import type { Car } from "../../models/car"
import { getCars, deleteCar, createCar, updateCar } from "../../data/car"
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"

const emptyForm: Omit<Car, 'vin'> = {
    image: '', manufacturer: '', model: '', constructionYear: 2020,
    mileage: 0, engineSize: 0, power: 0, gearbox: 'Manual',
    fuelType: 'Petrol', price: 0, description: '', equipment: ''
}

export function AdminPage() {
    const [cars, setCars] = useState<Car[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingCar, setEditingCar] = useState<Car | null>(null)
    const [form, setForm] = useState<Omit<Car, 'vin'>>(emptyForm)

    const loadCars = async () => {
        const result = await getCars({ limit: 100 })
        setCars(result.items)
    }

    useEffect(() => { loadCars() }, [])

    const handleEdit = (car: Car) => {
        setEditingCar(car)
        const { vin, ...rest } = car
        setForm(rest)
        setDialogOpen(true)
    }

    const handleAdd = () => {
        setEditingCar(null)
        setForm(emptyForm)
        setDialogOpen(true)
    }

    const handleDelete = async (vin: string) => {
        if (confirm("Are you sure you want to delete this car?")) {
            await deleteCar(vin)
            await loadCars()
        }
    }

    const handleSave = async () => {
        if (editingCar) {
            await updateCar({ ...form, vin: editingCar.vin })
        } else {
            const vin = crypto.randomUUID()
            await createCar({ ...form, vin })
        }
        setDialogOpen(false)
        await loadCars()
    }

    const updateForm = (field: keyof typeof form, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    return (
        <Box sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Admin - Car Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                    Add car
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Manufacturer</b></TableCell>
                            <TableCell><b>Model</b></TableCell>
                            <TableCell><b>Year</b></TableCell>
                            <TableCell><b>Fuel</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.vin}>
                                <TableCell>{car.manufacturer}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.constructionYear}</TableCell>
                                <TableCell>{car.fuelType}</TableCell>
                                <TableCell>{car.price.toLocaleString()} EUR</TableCell>
                                <TableCell>
                                    <IconButton size="small" color="primary" onClick={() => handleEdit(car)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(car.vin)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField label="Manufacturer" size="small" value={form.manufacturer} onChange={(e) => updateForm('manufacturer', e.target.value)} />
                    <TextField label="Model" size="small" value={form.model} onChange={(e) => updateForm('model', e.target.value)} />
                    <TextField label="Year" size="small" type="number" value={form.constructionYear} onChange={(e) => updateForm('constructionYear', Number(e.target.value))} />
                    <TextField label="Mileage (km)" size="small" type="number" value={form.mileage} onChange={(e) => updateForm('mileage', Number(e.target.value))} />
                    <TextField label="Engine size (cm3)" size="small" type="number" value={form.engineSize} onChange={(e) => updateForm('engineSize', Number(e.target.value))} />
                    <TextField label="Power (CP)" size="small" type="number" value={form.power} onChange={(e) => updateForm('power', Number(e.target.value))} />
                    <TextField label="Gearbox" size="small" value={form.gearbox} onChange={(e) => updateForm('gearbox', e.target.value)} />
                    <TextField label="Fuel type" size="small" value={form.fuelType} onChange={(e) => updateForm('fuelType', e.target.value)} />
                    <TextField label="Price (EUR)" size="small" type="number" value={form.price} onChange={(e) => updateForm('price', Number(e.target.value))} />
                    <TextField label="Image filename" size="small" value={form.image} onChange={(e) => updateForm('image', e.target.value)} />
                    <TextField label="Description" size="small" multiline rows={3} value={form.description} onChange={(e) => updateForm('description', e.target.value)} />
                    <TextField label="Equipment (comma separated)" size="small" multiline rows={2} value={form.equipment} onChange={(e) => updateForm('equipment', e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
