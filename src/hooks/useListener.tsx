// eslint-disable-next-line no-unused-vars
import { Signal, SignalListener } from '@yoieh/signal'
import { useMemo, useEffect } from 'react'

export function useListener<Listener extends (...args: any[]) => any>(
  signal: Signal<Listener>,
  fn: Listener
) {
  const listener = useMemo(() => new SignalListener<Listener>(signal, fn), [])

  useEffect(() => {
    return () => {
      listener.dispose()
    }
  })

  return { ...listener }
}
export default useListener
