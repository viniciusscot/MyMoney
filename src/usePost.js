import { useReducer } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    const { type, data } = action
    if (type === 'REQUEST')
        return { ...state, loading: true }

    if (type === 'SUCCESS')
        return { ...state, loading: false, data }

    return state
}

const usePost = url => {
    const [data, dispatch] = useReducer(reducer, {
        loading: true,
        data: {}
    })

    const post = data => {
        dispatch({ type: 'REQUEST' })

        axios.post(url, data).then(res => {
            dispatch({ type: 'SUCCESS', data: res.data })
            console.log(res.data)
        })
    }

    return [data, post]
}

export default usePost