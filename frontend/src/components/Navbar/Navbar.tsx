import { useTheme } from "../../hooks/useTheme"
import { useBasket } from "../../hooks/useBasket"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from "@mui/material"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import { Link } from "react-router-dom"

export function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme()
    const { basketItems } = useBasket()
    return (
        <AppBar position="sticky">
            <Toolbar>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    CarPark
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 0, sm: 1 } }}>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Button color="inherit" component={Link} to="/" startIcon={<DirectionsCarIcon />}>
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Cars</Box>
                    </Button>
                    <Button color="inherit" component={Link} to="/basket"
                        startIcon={
                            <Badge badgeContent={basketItems.length} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        }>
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Cart</Box>
                    </Button>
                    <Button color="inherit" component={Link} to="/admin" startIcon={<AdminPanelSettingsIcon />}>
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Admin</Box>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}