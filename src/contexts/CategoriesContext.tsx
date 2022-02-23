import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
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


    async function updateCategory(editCategoryInput: CategoryType){        
        if (user) {            
            //pega a cat (apenas para depois poder atualizar as goals com base no title da categoria)
            const oldCategory = await findCategory(editCategoryInput.id);

            //atualiza a category
            await setDoc(doc(getFirestore(), 'categories', editCategoryInput.id), {
                ...editCategoryInput
            });            

            //atualiza a category das goals
            if(oldCategory){
                updateCategoryOfGoal(oldCategory, editCategoryInput.title);
            }
            
        }
    }

    async function deleteCategory(categoryId: string){
        //pega a cat (apenas para depois poder atualizar as goals com base no title da categoria)
        const oldCategory = await findCategory(categoryId);

        //apaga a cat
        await deleteDoc(doc(getFirestore(), 'categories', categoryId));

        //atualiza a category das goals com vazio
        if(oldCategory){
            updateCategoryOfGoal(oldCategory, '');
        }
    }

    //funcao para atualizar a categoria das goals apos a cat ser editada ou apagada
    async function updateCategoryOfGoal(oldCategory: CategoryType, newValue: string){
        if(user){
            //pega a ref das goals
            const goalsRef = collection(getFirestore(), 'goals'); 
            //qry pra pegar as goals que tiverem essa cat
            const queryGoals = query(goalsRef, 
                where('userId', '==', user.id),
                where('category', '==', oldCategory.title),                                        
            );             

            //cria o snaphshot com o result e faz um loop
            onSnapshot(queryGoals, goalsSnapshot => {                
                goalsSnapshot.forEach(async goal => {
                    
                    //pega a ref da goal do loop
                    const goalUpdateRef = doc(getFirestore(), 'goals', goal.id);

                    //atualiza o campo categoria dessa goal pra ficar igual ao newValue passado
                    await updateDoc(goalUpdateRef, {
                        category: newValue
                    });                                                                   
                })
            })
        }
    }

    
    return(    
        <CategoriesContext.Provider value={{ categories, deleteCategory, findCategory, updateCategory }} >
            {children}
        </CategoriesContext.Provider>
    )
}
