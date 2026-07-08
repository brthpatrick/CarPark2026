import { useState } from "react"
import { Box, TextField, Button, Typography, Paper } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const [code, setCode] = useState('')
    const [error, setError] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const handleSubmit = () => {
        if (code === import.meta.env.VITE_ADMIN_CODE) {
            setAuthenticated(true)
        } else {
            setError(true)
            setCode('')
        }
    }

    if (authenticated) return <>{children}</>

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Paper sx={{ p: 4, maxWidth: 360, width: '100%', textAlign: 'center' }}>
                <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 3 }}>Admin Access</Typography>
                <TextField
                    label="Enter passcode"
                    type="password"
                    fullWidth
                    size="small"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError(false) }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    error={error}
                    helperText={error ? 'Incorrect passcode' : ''}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    Enter
                </Button>
            </Paper>
        </Box>
    )
}
