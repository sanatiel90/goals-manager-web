import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BoxUserModal } from "../BoxUserModal";
import { NewGoalModal } from "../NewGoalModal";

import { HeaderContainer, Content, HeaderLogo, HeaderInfo, HeaderMenu, UserPicture, MenuItem } from './style';

export function Header() {
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalNewGoalOpen, setIsModalNewGoalOpen] = useState(false);

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


    function handleOpenModalUser() {
        setIsModalUserOpen(true);
    }

    function handleCloseModalUser() {
        setIsModalUserOpen(false);
    }

    function handleOpenModalNewGoal(){
        setIsModalNewGoalOpen(true);
    }

    function handleCloseModalNewGoal(){
        setIsModalNewGoalOpen(false);
    }

    return(
        <HeaderContainer  >
            <Content>
                <HeaderLogo> <Link to="/">GoalsManager</Link> </HeaderLogo>            
                <HeaderInfo >
                    <nav>
                        <HeaderMenu>
                            <MenuItem> <Link to="/">Nova Categoria</Link> </MenuItem>
                            <MenuItem> <span onClick={handleOpenModalNewGoal} >Nova Meta </span>  </MenuItem>
                            <MenuItem> <Link to="/">Listar Metas</Link> </MenuItem>
                        </HeaderMenu>
                    </nav>
                    <UserPicture>
                        <button onClick={handleOpenModalUser} > <img src={user?.avatar} alt="Usuário" /> </button>                                         
                    </UserPicture>                                    
                </HeaderInfo>            
            </Content>

            <BoxUserModal
                isOpen={isModalUserOpen}
                user={user}
                handleLogout={handleLogOut}
                handleCloseModal={handleCloseModalUser}
            />

            <NewGoalModal
                isOpen={isModalNewGoalOpen}
                handleCloseModal={handleCloseModalNewGoal}
            />

            
        </HeaderContainer>
        
    )
}