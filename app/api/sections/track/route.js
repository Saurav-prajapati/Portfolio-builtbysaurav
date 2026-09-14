export async function POST(req) {
    try {
        const body = await req.json();

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";
        const userAgent = req.headers.get("user-agent") || "unknown";

        if (!body.email || !body.name) {
            return Response.json(
                { ok: false, error: "Missing fields" },
                { status: 400 }
            );
        }

        const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        console.log("Webhook URL:", webhook ? "set" : "MISSING");

        if (webhook) {
            const res = await fetch(webhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...body, ip, userAgent }),
                redirect: "follow",
            });
            console.log("Webhook status:", res.status);
        }

        return Response.json({ ok: true });
    } catch (err) {
        console.error("Track error:", err);
        return Response.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}