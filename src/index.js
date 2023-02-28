import { produce } from "immer"
let baseState = { name: "zs" }

let nextState = produce(baseState, (draft) => {
  draft.name = "ls"
})
console.log(baseState === nextState)
console.log("nextState=>", nextState)
