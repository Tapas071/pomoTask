import dbConnect from "@/lib/db/dbConnect";
import TodoModel from "@/models/Todo";
import { TodoType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
      const db = await dbConnect();
      const todos = await TodoModel.find({});
    return NextResponse.json( todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error has been occured" },
      { status: 500 }
    );
  }
}
