import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Layout from '../components/layout';

import { useAuth } from "../contexts/AuthContext";

import Home from '../pages/home';
import ManipularInformacoes from '../pages/curriculo/Casdastrarinformacoes';
import ManipularExperiencia from '../pages/curriculo/ManipularExperiencia';
import ListarExperiencia from '../pages/curriculo/ListarExperiencia';
import ManipularProjeto from '../pages/portfolio/ManipularProjeto';
import ListarPortfolio from '../pages/portfolio/Listarportfolio';



const AppRoutes: React.FC = () => {
    const{ authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login"/>;
    }

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/curriculo/informaçoes' element={<ManipularInformacoes />} />
                <Route path='/curriculo/experiencia/cadastrar' element={<ManipularExperiencia />} />
                <Route path='/curriculo/experiencia/listar' element={<ListarExperiencia />} />
                <Route path='/curriculo/experiencia/atualizar' element={<ManipularExperiencia />} />
                <Route path='/projeto/cadastrar' element={<ManipularProjeto />} />
                <Route path='/projeto/atualizar' element={<ManipularProjeto />} />
                <Route path='/portfolio/listar' element={<ListarPortfolio />} />
            </Routes>
        </Layout>
    )
};

export default AppRoutes;