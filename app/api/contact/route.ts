import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "../../validationSchemas";
import { mailOptions, transporter } from "./nodemailer";
import { z } from "zod";

type ContactFormData = z.infer<typeof contactFormSchema>;

const CONTACT_MESSAGE_FIELDS: Record<string, string> = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data: ContactFormData) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, value]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${value} \n \n`),
    ""
  );

  const htmlData = Object.entries(data).reduce(
    (str, [key, value]) =>
      (str += `<h1>${CONTACT_MESSAGE_FIELDS[key]}</h1><p>${value}</p>`),
    ""
  );

  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          p {
            font-size: 18px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div>
          ${htmlData}
        </div>
      </body>
    </html>
    `,
  };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = contactFormSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(body),
      subject: body.subject,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot send the email" },
      { status: 400 }
    );
  }

  return NextResponse.json(body, { status: 201 });
}
