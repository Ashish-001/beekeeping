import { promises as fs } from "fs";
import { uploadPath } from "@/lib/data";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

export async function GET(_req: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  const match = /^[a-f0-9-]{36}\.(jpg|png|webp|avif|gif)$/.exec(file);
  if (!match) return new Response("Not found", { status: 404 });

  try {
    const data = await fs.readFile(uploadPath(file));
    return new Response(data, {
      headers: {
        "Content-Type": TYPES[match[1]],
        // File names are random UUIDs and never reused, so they can be cached forever
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
