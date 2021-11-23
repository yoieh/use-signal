import React, { useCallback, useState } from 'react'
import { useListener, useSignal } from '@yoieh/use-signal'

export const UseListenerExample = () => {
  const [dispacheLog, setDispacheLog] = useState<string[]>([])
  const [count, setCount] = useState(0)

  const signal = useSignal()

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

  const listener = useListener(signal, funk)

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
            console.log('Dispose')
            listener.dispose()
          }}
        >
          dispose
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
