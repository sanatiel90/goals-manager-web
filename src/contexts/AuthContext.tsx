import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

//tipo para o user
type UserType = {
    id: string,
    name: string,
    email: string,
    avatar: string,
}

//tipo para o contexto, é as info q ele vai compartilhar; signInWithGoogle é uma funcao q retorna uma Promise void
type AuthContextType = {
    user: UserType | undefined,
    signInWithGoogle: () => Promise<void>,
    signOutGoogle: () => Promise<void>,
}

//tipo para as props do AuthContextProvider. Ele vai envolver as rotas da app, entao recebe children
//como ReactNode, que signifca receber qualquer conteudo React como filho
type AuthContextProviderProps = {
    children: ReactNode,
}

//criando o contexto, que vai compartilhar informacoes na app. 
//As informacoes compartilhadas serao a de user e a funcao para fazer o login (signInWithGoogle)
//Tais informacoes estao tipadas no AuthContextType, por isso o AuthContext usará esse tipo 
export const AuthContext = createContext({} as AuthContextType);

//essa classe definira o user e signInWithGoogle que serão inseridos no contexto AuthContext
export function AuthContextProvider(props: AuthContextProviderProps) {

    //estado que representa o user na app, é do tipo UserType
    const [user, setUser] = useState<UserType>();

    
    useEffect(() => {
        const auth = getAuth();
        //aqui vai monitorar o user logado no Google, caso haja modificacao pra atualizar no state user da app
        onAuthStateChanged(auth, (userGoogle) => {
            //se houver usuario, atualizar o user no state
            if(userGoogle){
                const { uid, displayName, email, photoURL } = userGoogle;

                if(!displayName || !email || !photoURL){
                    throw Error("Missing name or email");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    email: email,
                    avatar: photoURL
                });
            }
        });

    }, []);
    


    //funcao que faz o login com o Google e seta o user
    async function signInWithGoogle() {
        //constantes para autenticacao do Google
        const provider = new GoogleAuthProvider();
        const auth = getAuth()

        //faz o login Google com janela de Popup
        const result = await signInWithPopup(auth, provider);

        if(result.user) {
            //recupera os dados do result.user vindos do Google
            const { uid, displayName, email, photoURL } = result.user;

            

            if(!displayName || !email || !photoURL){
                throw Error("Missing name or email");
            }
            

            //atribui os dados do user vindos do Google ao state user da app
            setUser({
                id: uid,
                name: displayName,
                email: email,
                avatar: photoURL
            });
            
        }
    }

    //funcao q faz logout
    async function signOutGoogle() {
        const auth = getAuth();
        auth.signOut();
        setUser(undefined);
    }

    //retorna o contexto, com os valores q serao compartilhados. 
    //O contexto deve envolver as Routes da aplicacao (elas estarao no props.children)
    return (
        <AuthContext.Provider value={ { user, signInWithGoogle, signOutGoogle } } >
            {props.children}
        </AuthContext.Provider>
    )

    
}