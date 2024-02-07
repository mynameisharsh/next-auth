import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await auth();
  return new NextResponse(null, {
    status: user?.user?.role === UserRole.ADMIN ? 200 : 403,
  });
}
