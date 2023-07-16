import { NextResponse } from "next/server";
import { Blogs } from "@/models/blogs";
import { connectDb } from "@/helper/db";

connectDb();

//get Single user
export const GET = async (req, { params }) => {
  const userId = params[Object.keys(params)];

  try {
    const blog = await Blogs.findById(userId);

    return NextResponse.json({
      message: "blogs fetched!!",
      status: 200,
      data: blog,
    });
  } catch (error) {
    return NextResponse.json({
      message: "failled!!",
      status: 400,
    });
  }
};

//delete single user
export async function DELETE(request, { params }) {
  const { userId } = await params?.json();
  console.log("userId", userId);

  try {
    await Blogs.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      message: "user deleted!!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error in  delete user !!",
      success: false,
    });
  }
}

//update user
export const PUT = async (request, { params }) => {
  const { comments } = await request.json();
  const userId = params[Object.keys(params)];
  try {
    const blog = await Blogs.findById(userId);
    let prevArr = [... blog.comments]
    prevArr.push(comments)
    blog.comments = prevArr;

    const updateUser = await blog.save();
    return NextResponse.json( {
      message: "user succesfully update comment!!",
      status: 200,
      data:updateUser
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "user failed to update!!",
      status: 400,
    });
  }
};
