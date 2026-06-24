import { createContext } from "react"
import type { Car } from "../models/car"

export type BasketContextType = {
    basketItems: Car[]
    addToBasket: (car: Car) => void
    removeFromBasket: (vin: string) => void
    isInBasket: (car: Car) => boolean
    basketTotal: number
    clearBasket: () => void
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined)
