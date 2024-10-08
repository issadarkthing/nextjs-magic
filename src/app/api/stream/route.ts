export const dynamic = "force-dynamic"; // always run dynamically

export async function GET() {
    // This encoder will stream your text
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        async start(controller) {
            while (true) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                controller.enqueue(encoder.encode((1).toString()));
            }
        },
    });

    return new Response(customReadable, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
