import { useState } from "react";
import classes from "./Counter.module.scss";

export const Counter = () => {
  const [count, setCount] = useState(0);

  function incr() {
    setCount(prev => prev + 1);
  }
  return (
    <div className={classes.btn}>
      <button onClick={incr}>count</button>
      <h1>{count}</h1>
    </div>
  );
};
