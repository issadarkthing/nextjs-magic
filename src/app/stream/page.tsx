"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [count, setCount] = useState(0);

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
                    const value = parseInt(decoder.decode(chunk.value));
                    setCount((prev) => prev + value);
                }
            }
        })();
    }, []);

    return <div>Count: {count}</div>;
}
