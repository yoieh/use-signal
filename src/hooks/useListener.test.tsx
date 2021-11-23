import { renderHook, act } from '@testing-library/react-hooks'

import { useSignal } from './useSignal'
import { useListener } from './useListener'

describe('>>> useListener', () => {
  it('should trigger listener function', () => {
    const spy = jest.fn()

    const { result: sResult } = renderHook(() => useSignal<any>())

    const { result: lResult } = renderHook(() =>
      useListener<any>(sResult.current, spy)
    )

    act(() => {
      sResult.current.dispatch()
      lResult.current.dispose()
    })

    expect(spy).toHaveBeenCalled()
  })

  it('should dispose on dispose', () => {
    const spy1 = jest.fn()
    const spy2 = jest.fn()

    const { result: sResult } = renderHook(() => useSignal<any>())

    const { result: lResult } = renderHook(() =>
      useListener<any>(sResult.current, spy1)
    )

    renderHook(() => useListener<any>(sResult.current, spy2))

    expect(sResult.current.listeners.length).toBe(2)
    act(() => {
      lResult.current.dispose()
    })

    const fireAmount = 4

    act(() => {
      ;[...Array(fireAmount)].forEach(() => sResult.current.dispatch())
    })

    expect(spy1).toBeCalledTimes(0)
    expect(spy2).toBeCalledTimes(fireAmount)
  })
})
