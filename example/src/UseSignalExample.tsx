import React, { useState, useCallback, useEffect } from 'react'
import { useSignal } from '@yoieh/use-signal'

export const UseSignalExample = () => {
  const [dispacheLog, setDispacheLog] = useState<string[]>([])

  const [count, setCount] = useState(0)

  const signal = useSignal<any>()

  const funk = useCallback(
    (data: string) => {
      setCount((pre) => {
        const newCount = pre + 1
        setDispacheLog((preLog) => [
          ...preLog,
          `dispatched: ${data}, changed :${pre} => ${newCount}`
        ])

        return pre + 1
      })

      setListeners(signal.listeners.length)
    },
    [signal]
  )

  const [listeners, setListeners] = useState(signal.listeners.length)

  useEffect(() => {
    console.log(`effect ${signal.listeners.length}`)
    signal.add(funk)
    setListeners(signal.listeners.length)
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
        {listeners}
        <button
          type='button'
          onClick={() => {
            console.log('Add')
            signal.add(funk)
            setListeners(signal.listeners.length)
          }}
        >
          add
        </button>
      </div>

      <div>
        {dispacheLog.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  )
}
