/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  const refcount = React.useRef(count)
  refcount.current = count
  // const latestCountRef = useLatest(count)

  useEffect(() => {}, [])

  return (
    <>
      <p>count: {count}</p>
    </>
  )
}

export default App
