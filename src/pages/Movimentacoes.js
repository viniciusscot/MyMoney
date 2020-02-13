import React from 'react'

import Rest from '../utils/rest'

const baseUrl = `https://mymoney-6a4a5.firebaseio.com/`,
    { useGet } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)

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
                            <td>{data.data[movimentacao].valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes