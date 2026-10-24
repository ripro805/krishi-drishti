import { NextRequest, NextResponse } from "next/server";
import { updateFeedbackStatusServer } from "@/lib/feedback/serverFeedback";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.status || !["new", "reviewed", "flagged"].includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'new', 'reviewed', or 'flagged'" },
        { status: 400 }
      );
    }

    const updated = await updateFeedbackStatusServer(params.id, body.status);
    if (!updated) {
      return NextResponse.json({ error: "Feedback record not found" }, { status: 404 });
    }

    return NextResponse.json({ feedback: updated, message: `Status updated to ${body.status}` });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update feedback" },
      { status: 500 }
    );
  }
}
