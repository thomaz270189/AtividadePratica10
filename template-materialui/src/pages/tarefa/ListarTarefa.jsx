import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar dados da tarefa
function createData(
  id,
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa,
) {
  return { id, idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

// Dados iniciais
const initialRows = [
  createData(1, 1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

// Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState(initialRows);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    let tarefaParaEditar = tarefas.filter(obj => obj.id === id)[0];
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(current => current.filter(tarefa => tarefa.id !== id));
  };

  const columns = [
    { field: 'idTarefa', headerName: 'ID', width: 90 },
    { field: 'tituloTarefa', headerName: 'Título', width: 150 },
    { field: 'descricaoTarefa', headerName: 'Descrição', width: 150 },
    { field: 'inicioTarefa', headerName: 'Data de Início', width: 150 },
    { field: 'fimTarefa', headerName: 'Data de Finalização', width: 150 },
    { field: 'statusTarefa', headerName: 'Status', width: 150 },
    { field: 'recursoTarefa', headerName: 'Recurso', width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="success" onClick={() => handleEditar(params.id)}>
            <EditIcon fontSize="small" />
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeletar(params.id)}>
            <DeleteIcon fontSize="small" />
          </Button>
        </>
      ),
    }
  ];

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={tarefas} columns={columns} pageSize={5} />
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</Button>
          <Button size="small" variant="outlined">Cancelar</Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>
    </>
  );
};

export default ListarTarefa;
