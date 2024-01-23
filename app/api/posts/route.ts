import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category,
      content: body.content,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
