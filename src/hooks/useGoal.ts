import { useContext } from "react";
import { GoalsContext } from "../contexts/GoalsContext";

export function useGoal(){
    return useContext(GoalsContext);    
}