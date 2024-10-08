export const dynamic = "force-dynamic"; // always run dynamically

export async function GET() {
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        async start(controller) {
            await fetch(
                "https://741e-2001-e68-5409-7938-28c8-1be3-c32e-b3aa.ngrok-free.app"
            );
            controller.enqueue(encoder.encode((1).toString()));
        },
    });

    return new Response(customReadable, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
