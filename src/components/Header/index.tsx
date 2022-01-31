import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { HeaderContainer, Content, HeaderLogo, HeaderInfo, HeaderMenu, UserPicture, MenuItem, BoxUser } from './style';

export function Header() {
    const [diag, setDiag] = useState(false);
    const { user, signOutGoogle } = useAuth();
    const navigate = useNavigate();   

    useEffect(() => {
        if(!user){
            navigate('/');
        }
    }, [user, navigate]);

    async function handleLogOut(){
        await signOutGoogle();
        navigate('/');
    }

    function showDialog(){        
        
        diag === true ? setDiag(false) : setDiag(true);        
        
    }

    return(
        <HeaderContainer>
            <Content>
                <HeaderLogo> <Link to="/">GoalsManager</Link> </HeaderLogo>            
                <HeaderInfo >
                    <nav>
                        <HeaderMenu>
                            <MenuItem> <Link to="/">Nova Categoria</Link> </MenuItem>
                            <MenuItem> <Link to="/">Nova Meta</Link> </MenuItem>
                            <MenuItem> <Link to="/">Listar Metas</Link> </MenuItem>
                        </HeaderMenu>
                    </nav>
                    <UserPicture>
                        <button onClick={showDialog} > <img src={user?.avatar} alt="" /> </button>                                         
                    </UserPicture>                
                </HeaderInfo>            
            </Content>

            { diag &&     
                <BoxUser>
                    <img src={user?.avatar} alt="" /> 
                    <span>Olá, {user?.name}</span> 
                    <button onClick={handleLogOut}> Sair</button>
                </BoxUser>  
            }
        </HeaderContainer>

        
    )
}