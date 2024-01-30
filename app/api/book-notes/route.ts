import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { bookNoteSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = bookNoteSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newBookNote = await prisma.bookNote.create({
    data: {
      title: body.title,
      author: body.author,
      year: body.year,
      slug: body.slug,
      description: body.description,
      highlights: body.highlights,
      thoughts: body.thoughts,
      cover: body.cover,
    },
  });

  return NextResponse.json(newBookNote, { status: 201 });
}
