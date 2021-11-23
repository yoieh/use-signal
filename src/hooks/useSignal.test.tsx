import { renderHook, act } from '@testing-library/react-hooks'

import { useSignal } from './useSignal'

describe('>>> useSignal', () => {
  it('should dispach on dispach', () => {
    const spy = jest.fn()

    const { result } = renderHook(() => useSignal<any>())

    act(() => {
      result.current.add(spy)
      result.current.dispatch()
    })

    expect(spy).toHaveBeenCalled()
  })

  it('should add a new listener on add', () => {
    const spy = jest.fn()

    const { result } = renderHook(() => useSignal<any>())

    act(() => {
      result.current.add(spy)
      result.current.dispatch()
    })

    expect(result.current.listeners.length).toBe(1)
  })

  it('should remove a listener on remove', () => {
    const spy = jest.fn()

    const { result } = renderHook(() => useSignal<any>())

    act(() => {
      result.current.add(spy)
      result.current.remove(spy)
    })

    expect(result.current.listeners.length).toBe(0)
  })

  it('should remove all listeners on removeAll', () => {
    const spy = jest.fn()

    const { result } = renderHook(() => useSignal<any>())

    act(() => {
      result.current.add(spy)
    })

    expect(result.current.listeners.length).toBe(1)

    act(() => {
      result.current.removeAll()
    })

    expect(result.current.listeners.length).toBe(0)
  })
})
