import React from 'react'
import Rest from './rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
  { useGet } = Rest(baseUrl)

function App() {
  const data = useGet(`meses`)
  //   [postData, post] = usePost(`movimentacoes/2020-02`),
  //   [deleteData, remove] = useDelete()

  // const saveNew = () => {
  //   post({ valor: 10, descricao: 'biscoito' })
  // }

  // const doRemove = () => {
  //   remove(`movimentacoes/2020-02/-M-pgbXyzwYaqTF89opK`)
  // }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand'>MyMoney</a>
        </div>
      </nav>


      <div className='container'>
        <h2>Adicionar mês</h2>

        <select>
          <option value='2019'>2019</option>
          <option value='2020'>2020</option>
        </select>
        <select>
          <option value='01'>01</option>
          <option value='02'>02</option>
        </select>

        <button>Adicionar mês</button>

        {
          data.loading && <span>Carregando...</span>
        }

        {
          !data.loading && (
            <table className='table'>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Previsão Entrada</th>
                  <th>Entradas</th>
                  <th>Previsão Saida</th>
                  <th>Saidas</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.data).map(mes => (
                  <tr key={mes}>
                    <td>{mes}</td>
                    <td>{data.data[mes].previsao_entrada}</td>
                    <td>{data.data[mes].entradas}</td>
                    <td>{data.data[mes].previsao_saida}</td>
                    <td>{data.data[mes].saidas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }

        <pre>{JSON.stringify(data)}</pre>

      </div>
    </div>
  )
}

export default App