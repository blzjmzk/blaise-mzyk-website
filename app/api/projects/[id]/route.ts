import { patchProjectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchProjectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const project = await prisma?.project.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!project)
    return NextResponse.json({ error: "Invalid project" }, { status: 404 });

  const updatedProject = await prisma?.project.update({
    where: { id: project.id },
    data: {
      codeLink: body.codeLink,
      description: body.description,
      designLink: body.designLink,
      features: body.features,
      image: body.image,
      liveLink: body.liveLink,
      order: body.order,
      title: body.title,
      type: body.type,
    },
  });

  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetchujemy project z danym id
  const project = await prisma?.project.findUnique({
    where: { id: parseInt(params.id) },
  });

  //jeśli nie istnieje błąd
  if (!project)
    return NextResponse.json({ error: "Invalid project" }, { status: 404 });

  //jeśli istnieje usuwamy
  await prisma.project.delete({
    where: { id: project.id },
  });

  //zwracamy empty res klientowi
  return NextResponse.json({});
}
