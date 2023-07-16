import { connectDb } from "@/helper/db";
import { Blogs } from "@/models/blogs";
import { NextResponse } from "next/server";

//database connection
connectDb();

export async function GET() {
  let users = [];
  try {
    users = await Blogs.find();
    return NextResponse.json({
      message: "blogs fetched sucessfully",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "No blogs founds",
      status: 400,
      data: [],
    });
  }
}

export async function POST(request) {
  //fetch user deltels from request
  const { title, publication_date, summary, content, comments } = await request?.json();

  // create user object weeth user model
  const user = new Blogs({    title, publication_date, summary, content, comments   });

  try {
    const createdUser = await user.save();
    
    return NextResponse.json( {
      status: 200,
      data:user,
      message:'Blogs saved succesfully'
    })

  } catch (error) {
    console.log('error', error)

    return NextResponse.json( {
      status: 400,
      data:[],
      message:'failled'
    })
  }
 
}

// export function PUT() {}

// import { connectDb } from "@/helper/db";
// import { NextResponse } from "next/server";
// import { User } from "@/models/user";

// connectDb();
// // Get api call
// export async function GET (request){
//     let users =[];
//     try {
//       users = await User.find();
//     } catch (error) {
//        console.log(error);
//        return NextResponse.json({
//         message:"failed to get users",
//         success: false,
//        })
//     }
//     return NextResponse.json(users);
// }

// // POST api call
// export async function POST(request){
// const {name,email,password,about,profileURL}= await request.json();
// const user = new User({
//     name,email,password,about,profileURL
//     });

//  try{
//     const createUser = await user.save();
//     const response = NextResponse.json(user,{
//         status:201,
//     });
//      return response;
//  }catch(error){
//     console.log(error)
//     return NextResponse.json({
//         message:"Failed to create user !!",
//         status:false,
//     })
//  }
// }
