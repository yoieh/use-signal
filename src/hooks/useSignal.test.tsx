import { renderHook, act } from '@testing-library/react-hooks'

import { useSignal } from './useSignal'

describe('>>> useSignal', () => {
  it('should dispach on dispach', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    act(() => {
      s.add(spy)
      s.dispatch()
    })

    expect(spy).toHaveBeenCalled()
  })

  it('should add a new listener on add', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    act(() => {
      s.add(spy)
      s.dispatch()
    })

    expect(s.listeners.length).toBe(1)
  })

  it('should remove a listener on remove', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    act(() => {
      s.add(spy)
      s.remove(spy)
    })

    expect(s.listeners.length).toBe(0)
  })

  it('should remove all listeners on removeAll', () => {
    const spy = jest.fn()

    const {
      result: { current: s }
    } = renderHook(() => useSignal<any>())

    act(() => {
      s.add(spy)
      s.removeAll()
    })

    expect(s.listeners.length).toBe(0)
  })
})
