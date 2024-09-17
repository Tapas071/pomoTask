import dbConnect from "@/lib/db/dbConnect";
import TodoModel from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const {id }= await req.json();
    // find if the todo exists in the database
    const todoExists = await TodoModel.findById(id);
    if(!todoExists){
        return NextResponse.json({
            error: "Todo not found",
        }, { status: 404
        });
    }

    const todo = await TodoModel.findByIdAndDelete(id, {
    });
    // Extract the Authorization header from the request
    // const authHeader = req.headers.get("Authorization");

    // if (!authHeader) {
    //   return NextResponse.json(
    //     { error: "Authorization header missing" },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json( { status: 200,
        statusText: "OK",
        message: `Todo has been deleted successfully with id ${id}`,
     });
  } catch (error) {
    return NextResponse.json(
      { error: "Problem in the delete method" },
      { status: 500 }
    );
  }
}
