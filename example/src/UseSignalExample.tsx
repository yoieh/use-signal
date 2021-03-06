import React, { useState, useCallback, useEffect } from 'react'
import { useSignal } from '@yoieh/use-signal'

export const UseSignalExample = () => {
  const [dispacheLog, setDispacheLog] = useState<string[]>([])

  const [count, setCount] = useState(0)

  const signal = useSignal<any>()

  const funk = useCallback((data: string) => {
    setCount((pre) => {
      const newCount = pre + 1
      setDispacheLog((preLog) => [
        ...preLog,
        `dispatched: ${data}, changed :${pre} => ${newCount}`
      ])

      return pre + 1
    })
  }, [])

  useEffect(() => {
    signal.add(funk)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div>
        {count}
        <button
          type='button'
          onClick={() => {
            setDispacheLog([])
            signal.dispatch(count)
          }}
        >
          dispatch
        </button>
      </div>

      <div>
        {signal.listeners.length}
        <button
          type='button'
          onClick={() => {
            console.log('Add')
            signal.add(funk)
          }}
        >
          add
        </button>
      </div>

      <div>
        {dispacheLog.map((item, index) => (
          <div key={index}>
            <button
              type='button'
              onClick={() => {
                signal.remove(signal.listeners[index])
              }}
            >
              remove
            </button>
            {item}
          </div>
        ))}
      </div>

      <div>
        <button type='button' onClick={() => signal.removeAll()}>
          removeAll
        </button>
      </div>
    </div>
  )
}
