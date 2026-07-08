import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Content } from './components/Content/Content'
import { Navbar } from './components/Navbar/Navbar'
import { AdminPage } from './components/AdminPage/AdminPage'
import { AdminGuard } from './components/AdminGuard/AdminGuard'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'
import { FavoritesProvider } from './contexts/FavoritesProvider'
import { BasketProvider } from './contexts/BasketProvider'
import { NotificationProvider } from './contexts/NotificationProvider'
import { BasketPage } from './components/BasketPage/BasketPage'

export function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <FiltersProvider>
                    <FavoritesProvider>
                        <BasketProvider>
                            <CarListProvider>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Content />} />
                                    <Route path="/basket" element={<BasketPage />} />
                                    <Route path="/admin" element={<AdminGuard><AdminPage /></AdminGuard>} />
                                </Routes>
                            </CarListProvider>
                        </BasketProvider>
                    </FavoritesProvider>
                </FiltersProvider>
            </BrowserRouter>
        </NotificationProvider>
    )
}
