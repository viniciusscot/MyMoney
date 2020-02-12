import React from 'react'
import Rest from './rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
    { useGet } = Rest(baseUrl)

const Meses = () => {
    const data = useGet(`meses`)
    //   [postData, post] = usePost(`movimentacoes/2020-02`),
    //   [deleteData, remove] = useDelete()

    // const saveNew = () => {
    //   post({ valor: 10, descricao: 'biscoito' })
    // }

    // const doRemove = () => {
    //   remove(`movimentacoes/2020-02/-M-pgbXyzwYaqTF89opK`)
    // }

    if (data.loading)
        return (
            <span>Carregando...</span>
        )

    if (Object.keys(data.data).length > 0)
        return (
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

    return null
}

export default Meses