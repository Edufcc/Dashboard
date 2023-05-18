import React, { useEffect, useState }from 'react';

import styles from './Home.module.css';

// import { FaGraduationCap, FaBriefcase, FaFolder} from 'react-icons/fa';

import Title from '../../components/common/Title';
import InfoBox from '../../components/common/InfoBox';

import { Projeto, getPortfolio } from '../../services/portfolioService';
import { Experiencia, getExperienciaByTipo } from '../../services/experienciaService';

const Home = () => {
    const  [experienciasAcdemicas, setExperienciasAcademicas] = useState<Experiencia[]>([]);
    const [experienciasProfissionais, setExperienciasProfissionais] = useState<Experiencia[]>([]);
    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchExperienciasAcademicas = async () => {
        try {
            const response = await getExperienciaByTipo('academico');
            setExperienciasAcademicas(response)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExperienciasProfissionais = async () => {
        try {
            const response = await getExperienciaByTipo('profissional');
            setExperienciasProfissionais(response)
        } catch (error) {
            console.log(error);
        }
    };
    

    const fetchPortfolio = async () => {
        try {
            const response = await getPortfolio();
            setPortfolio(response);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchExperienciasAcademicas();
        fetchExperienciasProfissionais()
        fetchPortfolio();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Sistema Admin do Meu Site Pessoal!</Title>
            <p>Este é o Dashboard do site onde você encontra algumas estatísticas de cadastros.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox
                    title='Experiências Acadêmicas'
                    value={experienciasAcdemicas.length}
                    // icon={<FaGraduationCap size={65}/>}
                />

                <InfoBox
                    title='Experiências Profissionais'
                    value={experienciasProfissionais.length}
                    // icon={<FaBriefcase/>}
                />

                <InfoBox
                    title='Projetos no Portfólio'
                    value={portfolio.length}
                    // icon={<FaFolder/>}
                />
            </div>
        </main>
    );
};

export default Home;