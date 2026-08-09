import { redirect } from "next/navigation";

// 🎯 /admin લખતાં જ સીધું /admin/dashboard પર રીડાયરેક્ટ થશે
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}