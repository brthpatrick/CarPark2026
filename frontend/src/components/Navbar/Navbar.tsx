import { useTheme } from "../../hooks/useTheme"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Link } from "react-router-dom"

export function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme()
    return (
        <AppBar position="sticky">
            <Toolbar>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    CarPark
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Button color="inherit" component={Link} to="/">
                        Cars
                    </Button>
                    <Button color="inherit" component={Link} to="/basket" startIcon={<ShoppingCartIcon />}>
                        Basket
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}