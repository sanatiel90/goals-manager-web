import { useState } from "react";

//hook para encapsular os estados e funcoes de abrir e fechar modais
export function useModal() {
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalNewGoalOpen, setIsModalNewGoalOpen] = useState(false);
    const [isModalEditGoalOpen, setIsModalEditGoalOpen] = useState(false);
    const [isModalNewCategoryOpen, setIsModalNewCategoryOpen] = useState(false);

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

    function handleOpenModalEditGoal(){
        setIsModalEditGoalOpen(true);
    }

    function handleCloseModalEditGoal(){
        setIsModalEditGoalOpen(false);
    }

    function handleOpenModalNewCategory(){
        setIsModalNewCategoryOpen(true);
    }

    function handleCloseModalNewCategory(){
        setIsModalNewCategoryOpen(false);
    }
    
    const boxUserModal = {
        isOpen: isModalUserOpen,
        handleOpen: handleOpenModalUser,
        handleClose: handleCloseModalUser
    }

    const newGoalModal = {
        isOpen: isModalNewGoalOpen,
        handleOpen: handleOpenModalNewGoal,
        handleClose: handleCloseModalNewGoal
    }

    const editGoalModal = {
        isOpen: isModalEditGoalOpen,
        handleOpen: handleOpenModalEditGoal,
        handleClose: handleCloseModalEditGoal
    }

    const newCategoryModal = {
        isOpen: isModalNewCategoryOpen,
        handleOpen: handleOpenModalNewCategory,
        handleClose: handleCloseModalNewCategory
    }

    return {
        boxUserModal,
        newGoalModal,
        editGoalModal,
        newCategoryModal
    }

}