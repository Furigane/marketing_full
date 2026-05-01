import { NextResponse } from "next/server";

import { deleteBlogPost, updateBlogPost } from "@/lib/blog-store";
import { type BlogPostPayload } from "@/lib/blog";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader.startsWith("Bearer ") && authHeader.slice("Bearer ".length).trim().length > 0;
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as BlogPostPayload;
    const post = await updateBlogPost(id, payload);
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update post.";
    const status = message === "Post not found." ? 404 : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteBlogPost(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete post.";
    const status = message === "Post not found." ? 404 : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}
