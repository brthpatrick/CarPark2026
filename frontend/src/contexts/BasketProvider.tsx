import { useState, useCallback, useMemo } from "react"
import type { PropsWithChildren } from "react"
import type { Car } from "../models/car"
import { BasketContext } from "./BasketContext"
import { getBasket, createBasket, deleteBasket } from "../data/basket"
import { useEffect } from "react"
import { useNotification } from "../hooks/useNotification"

export function BasketProvider({ children }: PropsWithChildren) {
    const [basketItems, setBasketItems] = useState<Car[]>([])
    const { showNotification } = useNotification()

    const loadBasket = useCallback(async () => {
        try {
            const result = await getBasket()
            setBasketItems(result)
        } catch {
            showNotification("Failed to load cart", "error")
        }
    }, [])

    useEffect(() => {
        loadBasket()
    }, [loadBasket])

    const isInBasket = useCallback((car: Car) => {
        return basketItems.some((item) => item.vin === car.vin)
    }, [basketItems])

    const addToBasket = useCallback(async (car: Car) => {
        if (!isInBasket(car)) {
            await createBasket(car)
            await loadBasket()
            showNotification(`${car.manufacturer} ${car.model} added to cart`)
        }
    }, [isInBasket, loadBasket])

    const removeFromBasket = useCallback(async (vin: string) => {
        await deleteBasket(vin)
        await loadBasket()
        showNotification("Item removed from cart", 'info')
    }, [loadBasket])

    const clearBasket = useCallback(async () => {
        for (const item of basketItems) {
            await deleteBasket(item.vin)
        }
        await loadBasket()
    }, [basketItems, loadBasket])

    const basketTotal = useMemo(() => {
        return basketItems.reduce((sum, car) => sum + car.price, 0)
    }, [basketItems])

    return (
        <BasketContext.Provider value={{ basketItems, addToBasket, removeFromBasket, isInBasket, basketTotal, clearBasket }}>
            {children}
        </BasketContext.Provider>
    )
}
