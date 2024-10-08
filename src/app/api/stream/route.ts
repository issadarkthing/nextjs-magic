import { waitUntil } from "@vercel/functions";
export const dynamic = "force-dynamic"; // always run dynamically

export async function GET() {
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        async start(controller) {
            waitUntil(
                fetch(
                    "https://741e-2001-e68-5409-7938-28c8-1be3-c32e-b3aa.ngrok-free.app"
                )
                    .then((response) => response.json())
                    .then((response) => {
                        controller.enqueue(encoder.encode(response));
                    })
            );
        },
    });

    return new Response(customReadable, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
