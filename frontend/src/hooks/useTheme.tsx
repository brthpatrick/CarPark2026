import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'

export function useThemeMode() {
    return useContext(ThemeContext)
}
