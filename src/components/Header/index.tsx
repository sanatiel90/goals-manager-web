import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { BoxUserModal } from "../BoxUserModal";
import { NewCategoryModal } from "../NewCategoryModal";
import { NewGoalModal } from "../NewGoalModal";

import addGoalIcon from './../../assets/images/add-file-16.png';
import addCategoryIcon from './../../assets/images/add-list-16.png';
import listCategoryIcon from './../../assets/images/list-2-16.png';


import { HeaderContainer, Content, HeaderLogo, HeaderInfo, HeaderMenu, UserPicture, MenuItem, ActionsMenu } from './style';

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

    function handleLinkToCategories(){
        navigate('/categories-detail');
    }


    return(
        <HeaderContainer  >
            <Content>
                <HeaderLogo> <Link to="/home">GoalsManager</Link> </HeaderLogo>            
                <HeaderInfo >
                        
                        <ActionsMenu>
                            <button onClick={newGoalModal.handleOpen}>
                                <img src={addGoalIcon} alt="Add meta" />
                            </button>
                            <button onClick={newCategoryModal.handleOpen}>
                                <img src={addCategoryIcon} alt="Add categoria" />
                            </button>                            
                            <button onClick={handleLinkToCategories}>
                                <img src={listCategoryIcon} alt="List categorias" />
                            </button>
                        </ActionsMenu>

                    <nav>
                        <HeaderMenu>
                            <MenuItem onClick={newGoalModal.handleOpen}> <span>Nova Meta </span>  </MenuItem>
                            <MenuItem onClick={newCategoryModal.handleOpen} > <span>Nova Categoria</span> </MenuItem>                            
                            <MenuItem onClick={handleLinkToCategories} > <span>Listar Categorias </span>  </MenuItem>
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