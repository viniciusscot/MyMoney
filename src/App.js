import React from 'react'
import Rest from './rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
  { useGet, usePost, useDelete } = Rest(baseUrl)

function App() {
  const data = useGet(`movimentacoes/2020-02`),
    [postData, post] = usePost(`movimentacoes/2020-02`),
    [deleteData, remove] = useDelete()

  const saveNew = () => {
    post({ valor: 10, descricao: 'biscoito' })
  }

  const doRemove = () => {
    remove(`movimentacoes/2020-02/-M-pgbXyzwYaqTF89opK`)
  }

  return (
    <div>
      <h1>MyMoney</h1>

      {JSON.stringify(data)}
      {data.loading && <p>Loading...</p>}

      <button onClick={saveNew}>Salvar</button>

      <pre>{JSON.stringify(postData)}</pre>

      <button onClick={doRemove}>Remover</button>

      <pre>{JSON.stringify(deleteData)}</pre>

    </div>
  )
}

export default App