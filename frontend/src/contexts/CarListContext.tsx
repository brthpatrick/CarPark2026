import { createContext } from "react";
import type { Car } from "../models/car";

type CarListContextType = {
    carsList: Car[];
    totalPages: number;
    isError: boolean;
    isLoading: boolean;
}

export const CarListContext = createContext<CarListContextType | undefined>(undefined)
