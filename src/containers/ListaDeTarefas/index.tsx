import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'
import { useSelector } from 'react-redux'
import { rootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: rootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: rootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${
        termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''
      }`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${
        termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''
      }`
    }
    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((work) => (
          <li key={work.titulo}>
            <Tarefa
              id={work.id}
              titulo={work.titulo}
              descricao={work.descricao}
              prioridade={work.prioridade}
              status={work.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
