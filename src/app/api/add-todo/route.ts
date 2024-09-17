import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/dbConnect";
import TodoModel from "@/models/Todo";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    // Connect to the MongoDB database
    await dbConnect();
    // Create a new todo
    const todo = new TodoModel(data);
    await todo.save();


    

const responseInit: ResponseInit = {
  status: 200,
  statusText: "OK",
  
};
const responseBody = {
  message: "Todo has been added successfully",
};
    return NextResponse.json(
       {
         todo,
         responseBody, 
       },
       responseInit
     );
  } catch (error) {
    return NextResponse.json(
      { error: "error has been occured" },
      { status: 500 }
    );
  }
}
