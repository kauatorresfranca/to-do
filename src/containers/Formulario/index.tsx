import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { MainContainer, Titulo } from '../../styles'

import * as enums from '../../utils/enums/Tarefa'
import Tarefa from '../../models/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    const tarefaParaAdicionar = new Tarefa(
      titulo,
      prioridade,
      enums.Status.PENDENTE,
      descricao,
      9
    )

    dispatch(cadastrar(tarefaParaAdicionar))
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>
      <S.Form onSubmit={cadastrarTarefa}>
        <S.Input
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Título"
        />
        <S.Descricao
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          placeholder="Descrição da tarefa"
        />
        <S.Opcoes>
          <p>Prioridade</p>
          <input
            value={enums.Prioridade.URGENTE}
            name="prioridade"
            type="radio"
            id="urgente"
            onChange={(evento) =>
              setPrioridade(evento.target.value as enums.Prioridade)
            }
          />
          <label htmlFor="urgente">Urgente</label>
          <input
            value={enums.Prioridade.IMPORTATE}
            name="prioridade"
            type="radio"
            id="importante"
          />
          <label htmlFor="importante">importante</label>
          <input
            value={prioridade}
            name="prioridade"
            type="radio"
            id="normal"
            defaultChecked={prioridade === enums.Prioridade.NORMAL}
          />
          <label htmlFor="normal">normal</label>
        </S.Opcoes>
        <S.botaoSalvar type="submit">Cadastrar</S.botaoSalvar>
      </S.Form>
    </MainContainer>
  )
}

export default Formulario
