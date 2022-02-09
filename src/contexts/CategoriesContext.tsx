import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface CategoriesContextProviderProps {
    children: ReactNode
}

interface CategoryType {
    id: string;
    title: string;
    userId: string;
}

interface CategoryContextType {
    categories: CategoryType[]
}

export const CategoriesContext = createContext<CategoryContextType>({} as CategoryContextType);

export function CategoriesContextProvider({ children }: CategoriesContextProviderProps) {

    const [categories, setCategories] = useState<CategoryType[]>([]);

    const { user } = useAuth();    

    useEffect(() => {        
        
        if (user){            
            let categoriesFirebase: CategoryType[] = [];
            const categoriesRef = collection(getFirestore(), 'categories');
            const queryCategories = query(categoriesRef, where('userId', '==', user.id));
            getDocs(queryCategories).then(categoriesSnapshot => {
                
                categoriesSnapshot.forEach((cat) => {                    
                    categoriesFirebase.push({
                        id: cat.id,
                        title: cat.data().title,
                        userId: cat.data().userId,                             
                    });                   
                });  
                
                setCategories(categoriesFirebase);                
            });        
        }        
             
    }, [user]);

    return(
        <CategoriesContext.Provider value={{ categories }} >
            {children}
        </CategoriesContext.Provider>
    )
}