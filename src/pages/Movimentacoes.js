import React, { useState } from 'react'

import Rest from '../utils/rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
    { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const patch = usePatch()[1]
    const salvar = usePost(`movimentacoes/${match.params.data}`)[1]
    const remover = useDelete()[1]
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState(0)

    const salvarMovimentacao = async () => {
        if (!isNaN(valor) || valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {

            await salvar({
                descricao,
                valor: parseFloat(valor)
            })

            setDescricao('')
            setValor(0.0)
            data.refetch()
            dataMeses.refetch()
        }
    }

    const removerMovimentacao = async id => {
        await remover(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
        dataMeses.refetch()
    }

    const alterarPrevisaoEntrada = async evt => {
        await patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value })
        dataMeses.refetch()
    }

    const alterarPrevisaoSaida = async evt => {
        await patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value })
        dataMeses.refetch()
    }

    return (
        <div className='container'>
            <h1>Movimentações</h1>

            {!dataMeses.loading && (
                <div>
                    Previsão entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada} /> /
                    Previsão saida: {dataMeses.data.previsao_saida}<input type='text' onBlur={alterarPrevisaoSaida} />
                    <br />
                    Entrada: {dataMeses.data.entradas} / Saida: {dataMeses.data.saidas}
                </div>
            )}

            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data && Object.keys(data.data).map(movimentacao => (
                        <tr key={movimentacao}>
                            <td>{data.data[movimentacao].descricao}</td>
                            <td className='text-right'>
                                {data.data[movimentacao].valor}{' '}
                                <button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)}>-</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td><input type='text' value={descricao} id='descricao' onChange={e => setDescricao(e.target.value)} /></td>
                        <td>
                            <input type='text' value={valor} id='valor' onChange={e => setValor(e.target.value)} />
                            <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes