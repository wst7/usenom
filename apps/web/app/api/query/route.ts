/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { queryPkgsAndUsers } from '@usenom/api'
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json(
      { error: "Name parameter is required" },
      { status: 400 }
    );
  }
  try {
    const result = await queryPkgsAndUsers(name);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Search failed:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
