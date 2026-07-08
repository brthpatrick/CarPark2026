import { useState, useEffect, useCallback } from "react"
import type { PropsWithChildren } from "react"
import type { Car } from "../models/car"
import type { Favorite } from "../models/favorites"
import { useNotification } from "../hooks/useNotification"
import { getFavorites, createFavorite, deleteFavorite } from "../data/favorites"
import { FavoritesContext } from "./FavoritesContext"

export function FavoritesProvider({ children }: PropsWithChildren) {
    const [favorites, setFavorites] = useState<Favorite[]>([])
    const { showNotification } = useNotification()

    const loadFavorites = useCallback(async () => {
        try {
            const result = await getFavorites()
            setFavorites(result)
        } catch {
            showNotification("Failed to load favorites", "error")
        }
    }, [])

    useEffect(() => {
        loadFavorites()
    }, [loadFavorites])

    const isFavorite = useCallback((car: Car) => {
        return favorites.some((fav) => fav.vin === car.vin)
    }, [favorites])

    const toggleFavorite = useCallback(async (car: Car) => {
        if (isFavorite(car)) {
            await deleteFavorite({ vin: car.vin })
            showNotification('Removed from favorites', 'info')
        } else {
            await createFavorite({ vin: car.vin })
            showNotification(`${car.manufacturer} ${car.model} added to favorites`)
        }
        await loadFavorites()
    }, [isFavorite, loadFavorites, showNotification])


    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}