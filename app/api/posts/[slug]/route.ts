import authOptions from "@/app/auth/AuthOptions";
import { patchPostSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchPostSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const post = await prisma?.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const updatedPost = await prisma?.post.update({
    where: { slug: post.slug },
    data: {
      title: body.title,
      slug: body.slug,
      category: body.category,
      description: body.description,
      content: body.content,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  //fetchujemy post z danym slug
  const post = await prisma?.post.findUnique({
    where: { slug: params.slug },
  });

  //jeśli nie istnieje błąd
  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  //jeśli istnieje usuwamy
  await prisma.post.delete({
    where: { slug: post.slug },
  });

  //zwracamy empty res klientowi
  return NextResponse.json({});
}
