import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from './contexts/ThemeContext'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1565c0' },
        secondary: { main: '#f57c00' },
        background: {
            default: '#f0f2f5',
            paper: '#ffffff',
        },
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        secondary: { main: '#ffb74d' },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
})

function Root() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev)
    }, [])

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
)
