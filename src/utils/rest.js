import { useReducer, useEffect, useCallback } from 'react'
import axios from 'axios'

const INITIAL_STATE = {
    loading: true,
    data: {}
}

const reducer = (state, action) => {
    const { type, data } = action
    if (type === 'REQUEST')
        return { ...state, loading: true }

    if (type === 'SUCCESS')
        return { ...state, loading: false, data }

    return state
}

const init = baseUrl => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const carregar = useCallback(async () => {
            dispatch({ type: 'REQUEST' })

            const res = await axios.get(baseUrl + resource + `.json`)

            dispatch({ type: 'SUCCESS', data: res.data })
        }, [resource])

        useEffect(() => {
            carregar()
        }, [carregar])



        return { ...data, refetch: carregar }
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const post = async data => {
            dispatch({ type: 'REQUEST' })

            const res = await axios.post(baseUrl + resource + `.json`, data)

            dispatch({ type: 'SUCCESS', data: res.data })
        }

        return [data, post]
    }

    const useDelete = () => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const remove = async resource => {
            dispatch({ type: 'REQUEST' })

            await axios.delete(baseUrl + resource + `.json`)

            dispatch({ type: 'SUCCESS' })
        }

        return [data, remove]
    }

    const usePatch = () => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const patch = async (resource, data) => {
            dispatch({ type: 'REQUEST' })

            await axios.patch(baseUrl + resource + `.json`, data)

            dispatch({ type: 'SUCCESS' })
        }

        return [data, patch]
    }

    return {
        useGet,
        usePost,
        useDelete,
        usePatch
    }
}

export default init