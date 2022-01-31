import { useContext } from "react";
import { AuthContext } from "./../contexts/AuthContext";

//hook para encapsular o AuthContext; quem precisar pegar as info contidas 
//no AuthContext (user e signInWithGoogle), deve usar esse hook
export function useAuth(){
    return useContext(AuthContext);
}