import { useState, useRef } from "react"
import { toProxy, INTERNAL } from "./core"
// import * as is from "./is"
function useImmerState(baseState) {
  //先根据baseState声明一个基本状态
  const [state, setState] = useState(baseState)
  let proxy = toProxy(baseState, () => {
    queueMicrotask(() => {
      const internalState = draftRef.current[INTERNAL]
      const newState = internalState.draftState
      // setState(() => {
      //   return is.isArray(newState)
      //     ? [...newState]
      //     : Object.assign({}, newState)
      // })
      setState({ ...newState })
    })
  })
  const draftRef = useRef(proxy)
  const updateDraft = (producer) => producer(draftRef.current)

  return [state, updateDraft]
}
export default useImmerState
