import { NextResponse } from "next/server";

import { createBlogPost, getAllBlogPosts } from "@/lib/blog-store";
import { type BlogPostPayload } from "@/lib/blog";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader.startsWith("Bearer ") && authHeader.slice("Bearer ".length).trim().length > 0;
}

export async function GET() {
  const posts = await getAllBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as BlogPostPayload;
    const post = await createBlogPost(payload);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create post.";
    return NextResponse.json({ detail: message }, { status: 400 });
  }
}
