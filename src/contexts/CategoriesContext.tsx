import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
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
            const categoriesRef = collection(getFirestore(), 'categories'); //pega a ref do documento(tabela)
            const queryCategories = query(categoriesRef, where('userId', '==', user.id));  //cria uma query
            
            //recebendo atualizacoes das categories em tempo real
            onSnapshot(queryCategories, (categoriesSnapshot) => {
                categoriesFirebase = [];
                categoriesSnapshot.forEach((cat) => {                    
                    //add no array auxiliar as informacoes
                    categoriesFirebase.push({
                        id: cat.id,
                        title: cat.data().title,
                        userId: cat.data().userId,                             
                    });                   
                });  

                setCategories(categoriesFirebase);   
            })

            //unsubscribe();

            //usa o getDocs para pegar o snapshot com os resultados, desta forma pega so uma vez           
            /*getDocs(queryCategories).then(categoriesSnapshot => {   
                //percorre o snapshot  
                categoriesSnapshot.forEach((cat) => {                    
                    //add no array auxiliar as informacoes
                    categoriesFirebase.push({
                        id: cat.id,
                        title: cat.data().title,
                        userId: cat.data().userId,                             
                    });                   
                });  
                
                setCategories(categoriesFirebase);                
            });    */    
        }        
             
    }, [user]);

    return(
        <CategoriesContext.Provider value={{ categories }} >
            {children}
        </CategoriesContext.Provider>
    )
}