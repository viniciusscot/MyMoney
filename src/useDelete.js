import { useReducer } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    const { type } = action
    if (type === 'REQUEST')
        return { ...state, loading: true }

    if (type === 'SUCCESS')
        return { ...state, loading: false }

    return state
}

const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, {
        loading: true,
        data: {}
    })

    const remove = url => {
        dispatch({ type: 'REQUEST' })

        axios.delete(url).then(() => {
            dispatch({ type: 'SUCCESS' })
        })
    }

    return [data, remove]
}

export default useDelete