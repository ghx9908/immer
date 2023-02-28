## 1. 共享可变状态

```js
let objA = { name: "zhufeng" }
let objB = objA
objB.name = "jiagou"
console.log(objA.name)
```

## 2. 解决方案

- 深度拷贝

- [immutable-js](https://github.com/facebook/immutable-js)

## 3.immer

- [immer](https://github.com/immerjs/immer) 是 mobx 的作者写的一个 immutable 库
- 核心实现是利用 ES6 的 proxy,几乎以最小的成本实现了 js 的不可变数据结构

```js
cnpm i --save immer
```

## 4.produce

- 对 draftState 的修改都会反应到 nextState 上
- 而 Immer 使用的结构是共享的，nextState 在结构上又与 currentState 共享未修改的部分

### 4.1 基本使用

```js
import { produce } from "immer"
let baseState = {
  ids: [1],
  pos: {
    x: 1,
    y: 1,
  },
}

let nextState = produce(baseState, (draft) => {
  draft.ids.push(2)
})
console.log(baseState.ids === nextState.ids) //false
console.log(baseState.pos === nextState.pos) //true
```

## 5.useImmerState.js

### 5.1 基本使用

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {useImmerState} from './immer'
let id = 1;
function Todos() {
  const [todos, setTodos] = useImmerState({
    list: []
  })
  const addTodo = () => setTodos((draft) => {
    draft.list.push(id++)
  })
  return (
    <>
      <button onClick={addTodo}>增加</button>
      <ul>
        {
          todos.list.map((item, index) => <li key={index}>{item}</li>)
        }
      </ul>
    </>
  )
}
ReactDOM.render(
  <Todos />,
  document.getElementById('root')
);
```
