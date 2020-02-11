import React from 'react'
import useGet from './useGet'
import usePost from './usePost'
import useDelete from './useDelete'

const url = `https://mymoney-6a4a5.firebaseio.com/movimentacoes.json`

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()

  const saveNew = () => {
    post({ valor: 10, descricao: 'biscoito' })
  }

  const doRemove = () => {
    remove(`https://mymoney-6a4a5.firebaseio.com/movimentacoes/-M-oqlOIglumMe4Mp1Az.json`)
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