import React, { useState } from 'react'

import Rest from '../utils/rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
    { useGet, usePost, useDelete } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
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
        }
    }

    const removerMovimentacao = async id => {
        await remover(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
    }

    return (
        <div className='container'>
            <h1>Movimentações</h1>

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