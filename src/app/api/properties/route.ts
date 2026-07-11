import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.user.role !== "AGENT" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only agents and admins can create properties" },
        { status: 403 }
      );
    }

    const data = await req.json();

    // Basic validation
    if (!data.title || !data.description || !data.price || !data.address) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Create property error:", error);
    return NextResponse.json(
      { message: "An error occurred creating the property" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    
    const properties = await prisma.property.findMany({
      take: limit ? parseInt(limit) : undefined,
      where: {
        status: "AVAILABLE"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Get properties error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching properties" },
      { status: 500 }
    );
  }
}
