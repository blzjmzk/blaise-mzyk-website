import { patchBookNoteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const validation = patchBookNoteSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const bookNote = await prisma?.bookNote.findUnique({
    where: { slug: params.slug },
  });

  if (!bookNote)
    return NextResponse.json({ error: "Invalid book note" }, { status: 404 });

  const updatedBookNote = await prisma?.bookNote.update({
    where: { slug: bookNote.slug },
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

  return NextResponse.json(updatedBookNote);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  //fetchujemy bookNote z danym slug
  const bookNote = await prisma?.bookNote.findUnique({
    where: { slug: params.slug },
  });

  //jeśli nie istnieje błąd
  if (!bookNote)
    return NextResponse.json({ error: "Invalid book note" }, { status: 404 });

  //jeśli istnieje usuwamy
  await prisma.bookNote.delete({
    where: { slug: bookNote.slug },
  });

  //zwracamy empty res klientowi
  return NextResponse.json({});
}
