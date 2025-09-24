// /app/api/abonne/route.ts
import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_API_SERVER!,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Veuillez entrer une adresse e-mail valide !" },
        { status: 400 }
      );
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return NextResponse.json(
      { message: "Email inscrit avec succès ✅", data: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Cette adresse e-mail n'est pas valide ou est déjà utilisée 🚫" },
      { status: 500 }
    );
  }
}
