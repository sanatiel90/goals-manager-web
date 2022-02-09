import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login/index';
import { Home } from './pages/Home/index';
import { AuthContextProvider } from "./contexts/AuthContext";

import { GlobalStyle } from './styles/global';
import './services/firebase';
import { CategoriesContextProvider } from './contexts/CategoriesContext';

//o AuthContextProvider é um context q vai compartilhar info no app (user e funcao de login), ele
//precisa envolver as Routes para q elas tenham acesso as info

function App() {  

  return (
    <BrowserRouter>
      <AuthContextProvider>
      <CategoriesContextProvider>
      
      
        <Routes>
          <Route path="/" element={ <Login/> } />        
          <Route path="/home" element={ <Home/> }  />        
        </Routes>
        
      
      </CategoriesContextProvider>   
      </AuthContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
