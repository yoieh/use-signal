import { Signal } from '@yoieh/signal'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useSignal<Listener extends (...args: any[]) => any>() {
  const signal = useMemo(() => new Signal<Listener>(), [])
  const [listeners, setListeners] = useState(signal.listeners)

  const dispatch = useCallback(signal.dispatch, [signal])
  const add = useCallback(signal.add, [signal])
  const remove = useCallback(signal.remove, [signal])
  const removeAll = useCallback(signal.removeAll, [signal])

  useEffect(() => {
    setListeners(signal.listeners)
  }, [])

  return { dispatch, add, remove, removeAll, listeners }
}
export default useSignal
