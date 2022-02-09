import { createContext, ReactNode, useEffect, useState } from "react";

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

export const GoalsContext = createContext([]);


export function GoalsContextProvider({children}: GoalsContextProviderProps) {

    const [goals, setGoals] = useState<GoalType[]>([]);

    useEffect(() => {
        //chamada ao firebase para carregar as 15 ultimas goals
        
    }, []);

    
    function createNewGoal(){

    }

    function listAllGoals(){
        
    }

    return (
        <GoalsContext.Provider value={[]}>
            {children}
        </GoalsContext.Provider>
    )
}
