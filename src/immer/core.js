import * as is from "./is"
export const INTERNAL = Symbol("INTERNAL")
/**
 *
 * @param {*} baseState 原状态
 * @param {*} producer 生产者
 * @returns
 */
export function produce(baseState, producer) {
  const proxy = toProxy(baseState)
  producer(proxy)
  const internal = proxy[INTERNAL]
  return internal.mutated ? internal.draftState : baseState
}

export function toProxy(baseState, valueChange) {
  let keyToProxy = {} // key 映射的代理对象
  // 这里存的是内部的状态
  let internal = {
    baseState,
    draftState: createDraftState(baseState), //浅拷贝
    keyToProxy,
    mutated: false, //此对象是否发生了变更
  }
  return new Proxy(baseState, {
    get(target, key) {
      if (key === INTERNAL) {
        //如果访问代理对象的INTERNAL熟悉，我们就返回zhege internal 对象
        return internal
      }
      const value = target[key] // baseState.list:[1]
      //当我们访问这个对象的时候 我们就要对这个属性进行代理
      if (is.isObject(value) || is.isArray(value)) {
        if (key in keyToProxy) {
          //看 key是否再keyToProxy
          return keyToProxy[key]
        } else {
          keyToProxy[key] = toProxy(value, () => {
            //把value也变为代理对象
            internal.mutated = true //如果任何一个儿子变了，自己也会变
            const proxyOfChild = keyToProxy[key] //取出key的代理对象list的代理对象
            const { draftState } = proxyOfChild[INTERNAL]
            internal.draftState[key] = draftState
            valueChange && valueChange()
          })
          return keyToProxy[key] //如果是引用类型，先得到对应的proxy对象，然后返回这个代理对象
        }
      } else if (is.isFunction(value)) {
        internal.mutated = true
        valueChange && valueChange()
        return value.bind(internal.draftState)
      }
      return internal.mutated ? internal.draftState[key] : baseState[key]
    },
    set(target, key, value) {
      internal.mutated = true
      let { draftState } = internal
      for (const key in target) {
        draftState[key] = key in draftState ? draftState[key] : target[key]
      }
      draftState[key] = value //设置值的时候不修改baseState，而是修改draftState
      valueChange && valueChange()
      return true
    },
  })
  function createDraftState(baseState) {
    if (is.isArray(baseState)) {
      return [...baseState]
    } else if (is.isObject(baseState)) {
      return Object.assign({}, baseState)
    } else {
      return baseState
    }
  }
}
