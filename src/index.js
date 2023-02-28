import { produce } from "./immer"

const baseState = {
  list: ["1", "2"],
}
const result = produce(baseState, (draft) => {
  draft.list.push("3")
})
console.log(baseState)
console.log(result)
