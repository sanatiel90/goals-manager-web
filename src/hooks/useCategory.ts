import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export function useCategory(){
    return useContext(CategoriesContext);    
}