import { addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
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
    createdAt: Date;
}

interface NewGoalInput {
    title: string;
    category: string;
    deadline: string;    
}

interface GoalContextType {
    goals: GoalType[],
    createNewGoal: (newGoal: NewGoalInput) => Promise<void>;
}

export const GoalsContext = createContext<GoalContextType>({} as GoalContextType);


export function GoalsContextProvider({children}: GoalsContextProviderProps) {
    const { user } = useAuth();
    

    const [goals, setGoals] = useState<GoalType[]>([]);

    useEffect(() => {
        //chamada ao firebase para carregar as 15 ultimas goals
        if(user) {
            let goalsFirebase: GoalType[] = []; //array aux
            const goalsRef = collection(getFirestore(), 'goals'); //pega a ref
            const queryGoals = query(goalsRef, 
                                        where('userId', '==', user.id), 
                                        orderBy('createdAt', 'desc'),
                                        limit(3),                                        
                                        ); //monta query

            //pega os dados em tempo real
            onSnapshot(queryGoals, goalsSnapshot => {
                goalsFirebase = [];
                goalsSnapshot.forEach(goal => {
                    goalsFirebase.push({
                        id: goal.id,
                        title: goal.data().title,
                        category: goal.data().category,
                        deadline: goal.data().deadline,
                        status: goal.data().status,
                        userId: goal.data().userId,
                        createdAt: goal.data().createdAt,
                    });
                });

                setGoals(goalsFirebase);
            })

            
               
            //unsubscribe();

            //pega o snapshot e coloca os dados no array, esta forma pega so uma vez
            /*getDocs(queryGoals).then(goalsSnapshot => {
                goalsSnapshot.forEach(goal => {
                    goalsFirebase.push({
                        id: goal.id,
                        title: goal.data().title,
                        category: goal.data().category,
                        deadline: goal.data().deadline,
                        status: goal.data().status,
                        userId: goal.data().userId,
                        createdAt: goal.data().createdAt,
                    });
                });

                //coloca no estado
                setGoals(goalsFirebase);
            });*/
        }
    }, [user]);

    
    async function createNewGoal(newGoalInput: NewGoalInput){        
        if (user) {            
            //cria uma nova goal com base no input do user e dos valores default
            const newGoal = {
                ...newGoalInput,
                status: 'open',
                userId: user?.id,
                createdAt: new Date()
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

    function listAllGoals(){
        
    }

    return (
        <GoalsContext.Provider value={{ goals, createNewGoal }}>
            {children}
        </GoalsContext.Provider>
    )
}
