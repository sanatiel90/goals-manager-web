import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { BoxUserModal } from "../BoxUserModal";
import { NewCategoryModal } from "../NewCategoryModal";
import { NewGoalModal } from "../NewGoalModal";

import { HeaderContainer, Content, HeaderLogo, HeaderInfo, HeaderMenu, UserPicture, MenuItem } from './style';

export function Header() {

    const { boxUserModal, newGoalModal, newCategoryModal } = useModal();

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


    return(
        <HeaderContainer  >
            <Content>
                <HeaderLogo> <Link to="/home">GoalsManager</Link> </HeaderLogo>            
                <HeaderInfo >
                    <nav>
                        <HeaderMenu>
                            <MenuItem> <span onClick={newCategoryModal.handleOpen}>Nova Categoria </span> </MenuItem>
                            <MenuItem> <span onClick={newGoalModal.handleOpen}>Nova Meta </span>  </MenuItem>
                            <MenuItem> <Link to="/goals-detail">Listar Metas</Link> </MenuItem>
                        </HeaderMenu>
                    </nav>
                    <UserPicture>
                        <button onClick={boxUserModal.handleOpen} > <img src={user?.avatar} alt="Usuário" /> </button>                                         
                    </UserPicture>                                    
                </HeaderInfo>            
            </Content>

            <BoxUserModal
                isOpen={boxUserModal.isOpen}
                user={user}
                handleLogout={handleLogOut}
                handleCloseModal={boxUserModal.handleClose}
            />

            <NewGoalModal
                isOpen={newGoalModal.isOpen}
                handleCloseModal={newGoalModal.handleClose}
            />

            <NewCategoryModal 
                isOpen={newCategoryModal.isOpen}
                handleCloseModal={newCategoryModal.handleClose}
            />

            
        </HeaderContainer>
        
    )
}