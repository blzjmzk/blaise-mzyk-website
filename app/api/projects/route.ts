import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { projectSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = projectSchema.safeParse(body);
  console.log(validation);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newBookNote = await prisma.project.create({
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

  return NextResponse.json(newBookNote, { status: 201 });
}
