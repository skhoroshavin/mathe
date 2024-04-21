"use client";

import Display from "@/components/Display";
import Keypad from "@/components/Keypad";
import {useCallback} from "react";

export default function Home() {
  const onInput = useCallback((v: number) => {
    console.log("Button pressed:", v)
  }, [])

  return (
    <main className="container">
      <Display value={"56 : ? = 7"} score={50} hasError={false}/>
      <Keypad onClick={onInput}/>
    </main>
  );
}
