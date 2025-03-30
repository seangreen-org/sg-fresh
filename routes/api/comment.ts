// routes/api/comment.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req): Promise<Response> {
    try {
      const { comment } = await req.json();

      if (typeof comment !== "string" || comment.trim() === "") {
        return new Response(
          JSON.stringify({ error: "Invalid comment provided." }),
          {
            status: 400, // Bad Request
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Open Deno KV store
      const kv = await Deno.openKv();

      // Save the comment with a timestamp and unique ID
      const key = ["comments", crypto.randomUUID()];
      const value = {
        text: comment.trim(),
        submittedAt: new Date().toISOString(),
      };
      const result = await kv.set(key, value);

      if (!result.ok) {
        throw new Error("Failed to save comment to KV store.");
      }

      // Return success response
      return new Response(JSON.stringify({ message: "Comment saved!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("API Error:", error);
      // Return error response
      return new Response(
        JSON.stringify({
          error: error instanceof Error
            ? error.message
            : "Internal server error.",
        }),
        {
          status: 500, // Internal Server Error
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
