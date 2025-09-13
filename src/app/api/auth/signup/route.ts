import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  const { firstName, lastName, username, password, confirmPassword } =
    await request.json();

  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 }
    );
  }

  if (confirmPassword !== password) {
    return NextResponse.json(
      { message: "Password do not match!" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long!" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json({ message: "User created!" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
