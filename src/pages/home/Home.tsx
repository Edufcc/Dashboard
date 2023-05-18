import React, { useEffect, useState }from 'react';

import styles from './Home.module.css';

// import { FaGraduationCap, FaBriefcase, FaFolder} from 'react-icons/fa';

import Title from '../../components/common/Title';
import InfoBox from '../../components/common/InfoBox';

import { Projeto, getPortfolio } from '../../services/portfolioService';
import { Experiencia, getExperienciaByTipo } from '../../services/experienciaService';

const Home = () => {
    const  [Experiencia, setExperiencias] = useState<Experiencia[]>([]);
    const [Habilidade, setHabilidade] = useState<Experiencia[]>([]);
    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchExperiencias= async () => {
        try {
            const response = await getExperienciaByTipo('experiencia');
            setExperiencias(response)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchHabilidade = async () => {
        try {
            const response = await getExperienciaByTipo('habilidade');
            setHabilidade(response)
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
        fetchExperiencias();
        fetchHabilidade()
        fetchPortfolio();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Sistema Admin do Meu Site Pessoal!</Title>
            <p>Este é o Dashboard do site onde você encontra algumas estatísticas de cadastros.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox
                    title='Experiências'
                    value={Experiencia.length}
                    // icon={<FaGraduationCap size={65}/>}
                />

                <InfoBox
                    title='Habilidades'
                    value={Habilidade.length}
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