import { createContext } from "react"

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning'

export type NotificationContextType = {
    showNotification: (message: string, severity?: NotificationSeverity) => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)