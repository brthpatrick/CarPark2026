import './App.css'
import { Content } from './components/Content/Content'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'
import { FavoritesProvider } from './contexts/FavoritesProvider'

export function App() {
    return (
        <FiltersProvider>
            <FavoritesProvider>
                <CarListProvider>
                    <Content />
                </CarListProvider>
            </FavoritesProvider>
        </FiltersProvider>
    )
}

