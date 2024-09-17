import dbConnect from "@/lib/db/dbConnect";
import TodoModel from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse,
) {
    const {id } = params;
  try {
    const db = await dbConnect();
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some Error has been occured" },
      { status: 500 }
    );
  }
}
