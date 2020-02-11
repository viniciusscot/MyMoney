import { useEffect, useReducer } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    const { type, data } = action
    if (type === 'REQUEST')
        return { ...state, loading: true }

    if (type === 'SUCCESS')
        return { ...state, loading: false, data }

    return state
}

const useGet = url => {
    const [data, dispatch] = useReducer(reducer, {
        loading: true,
        data: {}
    })

    useEffect(() => {
        dispatch({ type: 'REQUEST' })

        axios.get(url).then(res => {
            dispatch({ type: 'SUCCESS', data: res.data })
        })
    }, [])

    return data
}


export default useGet