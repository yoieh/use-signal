// eslint-disable-next-line no-unused-vars
import { Signal, SignalListener } from '@yoieh/signal'
import { useCallback, useMemo } from 'react'

export function useListener<Listener extends (...args: any[]) => any>(
  signal: Signal<Listener>,
  fn: Listener
) {
  const listener = useMemo(() => new SignalListener<Listener>(signal, fn), [])

  const dispose = useCallback(() => {
    return listener.dispose()
  }, [listener])

  return { dispose, listener }
}
export default useListener
