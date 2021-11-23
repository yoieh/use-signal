import { Signal } from '@yoieh/signal'
import { useCallback, useState } from 'react'

export function useSignal<Listener extends (...args: any[]) => any>() {
  const [signal, setSignal] = useState(new Signal<Listener>())

  const [listeners, setListeners] = useState(signal.listeners)

  const dispatch = useCallback(signal.dispatch, [signal])
  const add = useCallback(
    (arg) => {
      signal.add(arg)

      setSignal(signal)
      setListeners(signal.listeners)
    },
    [signal]
  )

  const remove = useCallback(
    (listener) => {
      signal.remove(listener)

      setSignal(signal)
      setListeners(signal.listeners)
    },
    [signal]
  )

  const removeAll = useCallback(() => {
    signal.removeAll()

    setSignal(signal)
    setListeners(signal.listeners)
  }, [signal])

  return { dispatch, add, remove, removeAll, listeners }
}
export default useSignal
