"use client";

import { AdminAuthGuard } from "@/app/components/admin/admin-auth-guard";
import { BlogManager } from "@/app/components/admin/blog-manager";
import { AdminShell } from "@/app/components/admin/admin-shell";

export default function AdminBlogPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <BlogManager />
      </AdminShell>
    </AdminAuthGuard>
  );
}
