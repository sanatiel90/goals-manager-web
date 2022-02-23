import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
    categories: CategoryType[],
    deleteCategory: (categoryId: string) => Promise<void>,
    findCategory: (categoryId: string) => Promise<CategoryType | undefined>,
    updateCategory: (editCategory: CategoryType) => Promise<void>;
    
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

        }        
             
    }, [user]);


    async function updateCategory(editCategoryInput: CategoryType){        
        if (user) {            
            await setDoc(doc(getFirestore(), 'categories', editCategoryInput.id), {
                ...editCategoryInput
            });            
        }
    }


    async function findCategory(categoryId: string){
        if(user){                        
            const categoryRef = doc(getFirestore(), 'categories', categoryId); //recupera a ref 
            const categorySnapshot = await getDoc(categoryRef); //pega o snapshot
            if(categorySnapshot.exists()){   
                const categoryFirebase: CategoryType = { 
                    id: categoryId,
                    title: categorySnapshot.data().title,
                    userId: categorySnapshot.data().userId,                    
                }
                return categoryFirebase;                                                                        
            }                     
        }
    }


    async function deleteCategory(categoryId: string){
        await deleteDoc(doc(getFirestore(), 'categories', categoryId));
    }

    return(    
        <CategoriesContext.Provider value={{ categories, deleteCategory, findCategory, updateCategory }} >
            {children}
        </CategoriesContext.Provider>
    )
}
