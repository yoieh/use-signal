import { Signal } from '@yoieh/signal'
import { useEffect, useMemo } from 'react'

export function useSignal<
  Listener extends (...args: any[]) => any
>(): Signal<Listener> {
  const signal = useMemo(() => new Signal<Listener>(), [])

  useEffect(() => {
    return () => {
      signal.removeAll()
    }
  })

  return signal
}
export default useSignal
