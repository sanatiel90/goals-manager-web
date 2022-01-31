import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import googleIcon from './../../assets/images/google-icon.svg';
import { useAuth } from '../../hooks/useAuth';

import { Container, BoxLogin } from './style';

export function Login(){

    const { user, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    //ao carregar o componente de Login, caso ja exista user, mandar pra home
    useEffect(() => {

        if(user){
            navigate('/home');
        }
        
    }, [user, navigate]);


    //se nao houver user, fazer login
    async function handleLogin() {
        
        if(!user){
            await signInWithGoogle();
        } 

        navigate('/home');
    }

    return(
       <Container>
           <BoxLogin>
                <h1>Bem vindo ao GoalsManager</h1>
                <button onClick={handleLogin}>
                    <img src={googleIcon} alt="Google logo" />
                    Faça seu login com Google
                </button>
           </BoxLogin>
       </Container>
    );
}