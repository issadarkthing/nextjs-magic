"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [text, setText] = useState<string[]>([]);

    useEffect(() => {
        (async function () {
            const result = await fetch("/api/stream");

            if (!result.body) return;

            const reader = result.body.getReader();

            let done = false;
            while (!done) {
                const chunk = await reader.read();
                done = chunk.done;
                const { value } = chunk;
                const decoder = new TextDecoder();

                if (value) {
                    const text = decoder.decode(value);
                    setText((prevText) => [...prevText, text]);
                }
            }

            setText(text);
        })();
    }, []);

    return (
        <div>
            {text.map((x, i) => (
                <div key={i}>{x}</div>
            ))}
        </div>
    );
}
