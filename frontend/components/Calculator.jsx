import { useCanister } from '@connect2ic/react'
import React, { useReducer, useState } from 'react'

const ACTIONS = {
    SET_LOADING: 'set-loading',
    SET_RESULT: 'set-result',
    SET_ERROR: 'set-error',
}

function calculatorReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: true, result: null, error: null }
        case ACTIONS.SET_RESULT:
            return { ...state, loading: false, result: action.payload, error: null }
        case ACTIONS.SET_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function Calculator() {
    const [calculator] = useCanister('calculator')
    const [state, dispatch] = useReducer(calculatorReducer, {
        loading: false,
        result: null,
        error: null,
    })

    const { loading, result, error } = state
    console.log('🚀 ~ file: Calculator.jsx:32 ~ Calculator ~ result:', result)

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)

    const operations = {
        Suma: calculator.Suma,
        Resta: calculator.Resta,
        Multiplicacion: calculator.Multiplicacion,
        Division: calculator.Division,
    }

    const performOperation = async operationFunc => {
        dispatch({ type: ACTIONS.SET_LOADING })

        try {
            const response = await operationFunc(value1, value2)
            dispatch({ type: ACTIONS.SET_RESULT, payload: response })
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
        }
    }

    return (
        <div className='p-10 flex flex-col items-center justify-center'>
            <div className='mb-5'>
                <input
                    type='number'
                    value={value1}
                    onChange={e => setValue1(Number(e.target.value))}
                    className='p-2 border rounded mr-2'
                    placeholder='Número 1'
                />
                <input
                    type='number'
                    value={value2}
                    onChange={e => setValue2(Number(e.target.value))}
                    className='p-2 border rounded'
                    placeholder='Número 2'
                />
            </div>
            <div>
                {Object.keys(operations).map(op => (
                    <button
                        key={op}
                        className='bg-blue-500 text-white p-2 m-2 rounded'
                        onClick={() => performOperation(operations[op])}>
                        {op}
                    </button>
                ))}
            </div>
            {loading && <p>Cargando...</p>}
            {(typeof result === 'number' || typeof result === 'bigint') && !loading && (
                <div className='mt-5 text-lg'>Resultado: {result.toString()}</div>
            )}

            {error && <p className='mt-5 text-red-500'>Error: {error}</p>}
        </div>
    )
}

export default Calculator
