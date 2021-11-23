import { renderHook, act } from '@testing-library/react-hooks'

import { useSignal } from './useSignal'
import { useListener } from './useListener'

describe('>>> useListener', () => {
  it('should trigger listener function', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    const {
      result: { current: l }
    } = renderHook(() => useListener<any>(s, spy))

    act(() => {
      s.dispatch()
      l.dispose()
    })

    expect(spy).toHaveBeenCalled()
  })

  it('should dispose on dispose', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    const {
      result: { current: l }
    } = renderHook(() => useListener<any>(s, spy))

    expect(s.listeners.length).toBe(1)
    act(() => {
      l.dispose()
    })
    expect(s.listeners.length).toBe(0)
  })
})
