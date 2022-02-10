import { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";
import { CategoriesContextProvider } from "./CategoriesContext";
import { GoalsContextProvider } from "./GoalsContext";

interface GlobalContextProps {
    children: ReactNode;
}

//para encapsular todos os ContextProvider
export function GlobalContextProvider({ children }: GlobalContextProps) {
    return(
        <AuthContextProvider>
            <CategoriesContextProvider>
                <GoalsContextProvider>
                    {children}
                </GoalsContextProvider>
            </CategoriesContextProvider>
        </AuthContextProvider>
    )
}