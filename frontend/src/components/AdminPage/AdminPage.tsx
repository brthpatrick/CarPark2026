import { useState, useEffect } from "react"
import type { Car } from "../../models/car"
import { uploadImage } from "../../data/images"
import { getCars, deleteCar, createCar, updateCar } from "../../data/car"
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Pagination, Paper, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    FormControl, InputLabel, Select, MenuItem
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

const emptyForm: Car = {
    vin: '', image: '', manufacturer: '', model: '', constructionYear: 2020,
    mileage: 0, engineSize: 0, power: 0, gearbox: 'Manual',
    fuelType: 'Petrol', price: 0, description: '', equipment: ''
}

export function AdminPage() {
    const [cars, setCars] = useState<Car[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingCar, setEditingCar] = useState<Car | null>(null)
    const [form, setForm] = useState<Car>(emptyForm)
    const [uploading, setUploading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const LIMIT = 25
    const [sort, setSort] = useState<keyof Car | undefined>(undefined)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    const loadCars = async () => {
        const result = await getCars({ page, limit: LIMIT, sort, order })
        setCars(result.items)
        setTotalPages(result.totalPages)
    }

    useEffect(() => { loadCars() }, [page, sort, order])

    const handleEdit = (car: Car) => {
        setEditingCar(car)
        setForm(car)
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
            if (form.vin !== editingCar.vin) {
                await deleteCar(editingCar.vin)
                await createCar(form)
            } else {
                await updateCar(form)
            }
        } else {
            await createCar(form)
        }
        setDialogOpen(false)
        await loadCars()
    }

    const updateForm = (field: keyof Car, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const vinError = form.vin.length > 0 && form.vin.length !== 17
    const vinHelperText = vinError
        ? 'VIN must be exactly 17 characters'
        : form.vin.length > 0 ? `${form.vin.length}/17` : ''
    const isSaveDisabled = !form.image || form.vin.trim().length !== 17

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const result = await uploadImage(file)
            updateForm('image', result.fileName)
        } finally {
            setUploading(false)
        }

    }

    const handleSort = (field: keyof Car) => {
        if (sort === field) {
            setOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSort(field)
            setOrder('asc')
        }
    }

    return (
        <Box sx={{ py: 3, px: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Admin - Car Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                    Add car
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => handleSort('manufacturer')}
                                sx={{ cursor: 'pointer', userSelect: 'none' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <b>Manufacturer</b>
                                    {sort === 'manufacturer' && (
                                        order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell onClick={() => handleSort('model')} sx={{ cursor: 'pointer', userSelect: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <b>Model</b>
                                    {sort === 'model' && (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                                </Box>
                            </TableCell>
                            <TableCell onClick={() => handleSort('constructionYear')} sx={{ cursor: 'pointer', userSelect: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <b>Year</b>
                                    {sort === 'constructionYear' && (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                                </Box>
                            </TableCell>
                            <TableCell onClick={() => handleSort('fuelType')} sx={{ cursor: 'pointer', userSelect: 'none', display: { xs: 'none', sm: 'table-cell' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <b>Fuel</b>
                                    {sort === 'fuelType' && (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                                </Box>
                            </TableCell>
                            <TableCell onClick={() => handleSort('price')} sx={{ cursor: 'pointer', userSelect: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <b>Price</b>
                                    {sort === 'price' && (order === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                                </Box>
                            </TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.vin}>
                                <TableCell>{car.manufacturer}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.constructionYear}</TableCell>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{car.fuelType}</TableCell>
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

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_e, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                />
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="VIN"
                        size="small"
                        value={form.vin}
                        onChange={(e) => updateForm('vin', e.target.value.toUpperCase())}
                        error={vinError}
                        helperText={vinHelperText}
                        slotProps={{ htmlInput: { maxLength: 17 } }}
                    />
                    <TextField label="Manufacturer" size="small" value={form.manufacturer} onChange={(e) => updateForm('manufacturer', e.target.value)} />
                    <TextField label="Model" size="small" value={form.model} onChange={(e) => updateForm('model', e.target.value)} />
                    <TextField label="Year" size="small" type="number" value={form.constructionYear || ''} onChange={(e) => updateForm('constructionYear', e.target.value === '' ? 0 : Number(e.target.value))} />
                    <TextField label="Mileage (km)" size="small" type="number" value={form.mileage || ''} onChange={(e) => updateForm('mileage', e.target.value === '' ? 0 : Number(e.target.value))} />
                    <TextField label="Engine size (cm3)" size="small" type="number" value={form.engineSize || ''} onChange={(e) => updateForm('engineSize', e.target.value === '' ? 0 : Number(e.target.value))} />
                    <TextField label="Power (CP)" size="small" type="number" value={form.power || ''} onChange={(e) => updateForm('power', e.target.value === '' ? 0 : Number(e.target.value))} />
                    <FormControl size="small">
                        <InputLabel>Gearbox</InputLabel>
                        <Select value={form.gearbox} label="Gearbox" onChange={(e) => updateForm('gearbox', e.target.value)}>
                            <MenuItem value="Manual">Manual</MenuItem>
                            <MenuItem value="Automatic">Automatic</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel>Fuel type</InputLabel>
                        <Select value={form.fuelType} label="Fuel type" onChange={(e) => updateForm('fuelType', e.target.value)}>
                            <MenuItem value="Petrol">Petrol</MenuItem>
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Electric">Electric</MenuItem>
                            <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Price (EUR)" size="small" type="number" value={form.price || ''} onChange={(e) => updateForm('price', e.target.value === '' ? 0 : Number(e.target.value))} />
                    <Box>
                        <Button
                            variant="outlined"
                            component="label"
                            disabled={uploading}
                            size="small"
                        >
                            {uploading ? 'Uploading...' : "Upload Image"}
                            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                        </Button>
                        {form.image && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Selected: {form.image}
                            </Typography>
                        )}
                    </Box>
                    <TextField label="Description" size="small" multiline rows={3} value={form.description} onChange={(e) => updateForm('description', e.target.value)} />
                    <TextField label="Equipment (comma separated)" size="small" multiline rows={2} value={form.equipment} onChange={(e) => updateForm('equipment', e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
