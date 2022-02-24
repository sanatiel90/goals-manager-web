import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface GoalsContextProviderProps {
    children: ReactNode;
}

interface GoalType {
    id: string;
    title: string;
    category: string;
    deadline: string;
    status: string;
    userId: string;
    createdAt: string;
}

interface GoalInput {
    id?: string;
    title: string;
    category: string;
    deadline: string;    
}

interface GoalContextType {
    goals: GoalType[],
    createNewGoal: (newGoal: GoalInput) => Promise<void>;
    deleteGoal: (goalId: string) => Promise<void>;
    findGoal: (goalId: string) => Promise<GoalType | undefined>;
    updateGoal: (editGoal: GoalType) => Promise<void>;
    updateCurrentStatus: (goalId: string, currentStatus: string) => Promise<void> ;
}

export const GoalsContext = createContext<GoalContextType>({} as GoalContextType);


export function GoalsContextProvider({children}: GoalsContextProviderProps) {
    const { user } = useAuth();
    
    const [goals, setGoals] = useState<GoalType[]>([]);

    //carrega 10 metas ordenadas pelo prazo de conclusao
    /*useEffect(() => {
        //chamada ao firebase para carregar as 10 ultimas goals
        if(user) {
            let goalsFirebase: GoalType[] = []; //array aux
            const goalsRef = collection(getFirestore(), 'goals'); //pega a ref
            const queryGoals = query(goalsRef, 
                                        where('userId', '==', user.id),
                                        where('status', '!=', 'finished'),
                                        orderBy('status'),                                                                                 
                                        orderBy('deadline'),
                                        limit(10),                                        
                                    ); //monta query

            //pega os dados em tempo real e coloca num array
            onSnapshot(queryGoals, goalsSnapshot => {
                goalsFirebase = [];
                goalsSnapshot.forEach(goal => {

                    //se o status nao estiver finalizado, olhar se esta atrasado ou em atencao
                    let currentStatus = goal.data().status;                                                            
                    if(currentStatus !== 'finished'){      
                        const currentDeadline = goal.data().deadline;   
                        
                        if(new Date(currentDeadline).getTime() > new Date().getTime() && currentStatus !== 'open'){
                            currentStatus = 'open';
                        }                          

                        if(new Date(currentDeadline).getTime() < new Date().getTime() && currentStatus !== 'late'){                            
                            currentStatus = 'late';
                        }       
                        
                        if(new Date(currentDeadline).getTime() === new Date().getTime() && currentStatus !== 'caution'){                           
                            currentStatus = 'caution';
                        }  
                    }

                    //se tiver mudado o status, atualizar no banco
                    if(currentStatus !== goal.data().status) {                        
                         updateCurrentStatus(goal.id, currentStatus);
                    }

                    goalsFirebase.push({
                        id: goal.id,
                        title: goal.data().title,
                        category: goal.data().category,
                        deadline: goal.data().deadline,
                        status: currentStatus,
                        userId: goal.data().userId,
                        createdAt: goal.data().createdAt,
                    });
                });

                setGoals(goalsFirebase);
            })
               
            //unsubscribe();           
        }
    }, [user]);*/

    async function updateCurrentStatus(goalId: string, currentStatus: string) {
        const goalRef = doc(getFirestore(), "goals", goalId);
        await updateDoc(goalRef, {
            status: currentStatus
        })
    }

    //cria nova meta
    async function createNewGoal(newGoalInput: GoalInput){        
        if (user) {            
            //cria uma nova goal com base no input do user e dos valores default
            const newGoal = {
                ...newGoalInput,
                status: 'open',
                userId: user?.id,
                createdAt: new Date().toLocaleString('pt-BR')
            }

            //cria o novo goal, retornando uma ref q vai ter o id criado
            const goalRef = await addDoc(collection(getFirestore(), 'goals'), newGoal);            

            //cria um data com o novo goal e o id
            const data = {
                ...newGoal,
                id: goalRef.id
            }

            //aplica nos goals
            setGoals([
                ...goals,
                data
            ]);
        }
    }

    //atualiza uma goal
    async function updateGoal(editGoalInput: GoalType){        
        if (user) {            

            await setDoc(doc(getFirestore(), 'goals', editGoalInput.id), {
                ...editGoalInput
            });            
        }
    }


    //busca uma goal
    async function findGoal(goalId: string){
        if(user){                        
            const goalRef = doc(getFirestore(), 'goals', goalId); //recupera a ref da goal
            const goalSnapshot = await getDoc(goalRef); //pega o snapshot
            if(goalSnapshot.exists()){   
                const goalFirebase: GoalType = { //preenche um obj GoalType com o resultado do snapshot
                    id: goalId,
                    title: goalSnapshot.data().title,
                    category: goalSnapshot.data().category,
                    deadline: goalSnapshot.data().deadline,
                    status: goalSnapshot.data().status,
                    userId: goalSnapshot.data().userId,
                    createdAt: goalSnapshot.data().createdAt,                    
                }
                return goalFirebase;                                                                        
            }                     
        }
    }
    
    //apaga uma goal
    async function deleteGoal(goalId: string){
        await deleteDoc(doc(getFirestore(), 'goals', goalId));
    }

    return (
        <GoalsContext.Provider value={{ goals, createNewGoal, deleteGoal, findGoal, updateGoal, updateCurrentStatus }}>
            {children}
        </GoalsContext.Provider>
    )
}
