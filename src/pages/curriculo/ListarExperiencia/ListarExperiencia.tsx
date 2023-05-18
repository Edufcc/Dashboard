import React, { useEffect }from 'react';

import { useNavigate } from 'react-router-dom'

import { Table, Column } from '../../../components/common/Table';

import { Experiencia, deleteExperiencia, getExperiencia } from '../../../services/experienciaService';
;



const ListarExperiencia: React.FC = () => {
    const navigate = useNavigate()
    const[experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia();
            setExperiencias(experiencias);
        } catch (error) {
            console.log('Erro ao buscar experiêcias', error)
        }
    }

    useEffect(() => {
        fetchExperiencias()
    }, [])

    const handleEdit = async (experiencia:Experiencia) => {
        navigate('/curriculo/experiencia/atualizar', { state: experiencia})

    };
    
    const handleDelete = async (experiencia:Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id)
            fetchExperiencias();
            alert('Experiência excluída com sucesso')
        } catch (error) {
            console.log('Erro ao excluir experiência',error)
            alert('Ocorreu um errro ao excluir a experiência')
        }
    };

    const columns: Column<Experiencia>[] = [
        { header: 'Titulo', accessor: 'titulo'},
        { header: 'Descrição', accessor: 'descricao'},
        { header: 'Tipo', accessor: 'tipo'},
        { header: 'Ano Inicio', accessor: 'anoInicio'},
        { header: 'Ano Fim', accessor: 'anoFim'},
    ] 
    
    return(
       <Table
            columns={columns}
            data={experiencias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
        
    );
};

export default ListarExperiencia;