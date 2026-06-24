import { createContext, useState, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'

type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    mode: ThemeMode
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => {},
})

export function ThemeProvider({ children }: PropsWithChildren) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('carpark-theme')
        return (saved === 'dark' || saved === 'light') ? saved : 'light'
    })

    const toggleTheme = () => {
        setMode(prev => {
            const next = prev === 'light' ? 'dark' : 'light'
            localStorage.setItem('carpark-theme', next)
            return next
        })
    }

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: '#1565c0',
            },
            secondary: {
                main: '#f57c00',
            },
            ...(mode === 'light'
                ? {
                    background: {
                        default: '#f5f7fa',
                        paper: '#ffffff',
                    },
                }
                : {
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                }),
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                    },
                },
            },
        },
    }), [mode])

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}
