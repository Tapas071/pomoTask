import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/dbConnect";
import TodoModel from "@/models/Todo";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const mappedData = {
      title: data.title,
      description: data.description,
      isCompleted: data.status || false,
    }
    console.log(mappedData);
    // Connect to the MongoDB database
    await dbConnect();
    // // Create a new todo
    const todo = new TodoModel(mappedData);
    await todo.save();
    // const todo = "something todo"
    

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
    console.error(error);
    return NextResponse.json(
      { error: "error has been occured" },
      { status: 500 }
    );
  }
}
