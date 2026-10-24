import { NextRequest, NextResponse } from "next/server";
import { getAdminStatsServer } from "@/lib/admin/serverAdmin";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  try {
    const stats = await getAdminStatsServer();
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("[Admin Stats API] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to aggregate admin statistics" },
      { status: 500 }
    );
  }
}
