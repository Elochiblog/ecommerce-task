import { useState } from "react";

export function Toggle({ initial = false, render }) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((prev) => !prev);
  return render(on, toggle);
}
