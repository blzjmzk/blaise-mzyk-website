import { patchPostSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const validation = patchPostSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const post = await prisma?.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const updatedIssue = await prisma?.post.update({
    where: { id: post.id },
    data: {
      title: body.title,
      slug: body.slug,
      category: body.description,
      description: body.description,
      content: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
