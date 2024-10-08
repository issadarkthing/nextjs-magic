"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [text, setText] = useState("loading...");

    useEffect(() => {
        (async function () {
            const result = await fetch("/api/stream");

            if (!result.body) return;

            const reader = result.body.getReader();

            let done = false;
            while (!done) {
                const chunk = await reader.read();
                done = chunk.done;
                const decoder = new TextDecoder();

                if (chunk.value) {
                    const value = decoder.decode(chunk.value);
                    console.log(value);
                    setText(value);
                }
            }
        })();
    }, []);

    return <div>{text}</div>;
}
