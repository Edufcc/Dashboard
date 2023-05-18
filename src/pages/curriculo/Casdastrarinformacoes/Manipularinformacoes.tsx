import React, { useEffect, useState } from 'react';

// import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

import Form from '../../../components/forms/Form/Form';
import Input from '../../../components/forms/Input/Input';
import Textarea from '../../../components/forms/textarea';
import InformacoesCard from './InformacoesCard/InformacoesCard';
import Button from '../../../components/common/Button/Button';
import Title from '../../../components/common/Title';

import { Informacoes,
        getInformacoes, 
        deleteInformacoes, 
        createOrUpdateInformacoes 
    } from '../../../services/informacoesService';

import styles from './Manipularinformacoes.module.css'



const Manipularinformacoes: React.FC = () => {
    const [informacoes, setInformacoes] = useState<Informacoes>();

    const initialValues: Informacoes = {
        foto: '',
        nome: '',
        cargo: '',
        resumo: '',
    };

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required('Campo obrigatório'),
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),
        resumo: Yup.string().required('Campo obrigatório'),
    });

    const fetcInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status !== 404)
                console.error('Erro ao buscar informações', error);
            }
         else {
            console.error('Ocorreu um erro desconhecido ao buscar informações', error);
        }
    }
    };

    useEffect(() => {
        fetcInformacao();
    }, []);

    const onSubmit = async (values: Informacoes) => {
        try {
            await createOrUpdateInformacoes(values);
            setInformacoes(values);
            alert('Formulário enviado com sucesso');
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário.');
        }

    };

    const handleDelete = async () => {
        try {
            await deleteInformacoes();
            setInformacoes(undefined);
            alert('Informações deletadas com sucesso!')
        } catch (error) {
            console.error('Erro ao deletar as informações:', error)
            alert('Ocorreu um erro ao deletar as informações. Tente novamente.')
        }

    };

    return (
        <div className={styles.container}>

            <Form
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>

                {({ errors, touched }) => (

                    <>

                        <Title>Informações</Title>

                        <Input
                            label='Foto'
                            name='foto'
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label='Nome'
                            name='nome'
                            errors={errors.nome}
                            touched={touched.nome}
                        />


                        <Input
                            label='Cargo'
                            name='cargo'
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label='Resumo'
                            name='resumo'
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type='submit'>Salvar</Button>

                    </>
                )}
            </Form> 
        
                {informacoes &&
                    <div className={styles.cardContainer}>
                        <InformacoesCard informacoes={informacoes} />
                        <Button onClick={handleDelete} red>Deletar</Button>
                    </div>
                }
        </div>
    );
};

export default Manipularinformacoes;