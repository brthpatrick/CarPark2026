import { useState } from "react"
import type { PropsWithChildren } from "react"
import { NotificationContext } from "./NotificationContext"
import type { NotificationSeverity } from "./NotificationContext"
import { Snackbar, Alert } from "@mui/material"

export function NotificationProvider({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<NotificationSeverity>('success')

    const showNotification = (msg: string, sev: NotificationSeverity = 'success') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={severity} onClose={() => setOpen(false)} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}