import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstname, lastname } = body || {};

    if (!firstname || !lastname) {
      return NextResponse.json({error:"First and last name are required."},{status:400});
    }

    const base = process.env.API_BASE_URL;
    const key = process.env.API_KEY;

    if (!base || !key) {
      return NextResponse.json(
        {error:"Server API configuration is missing. Set API_BASE_URL and API_KEY."},
        {status:500}
      );
    }

    // The exact endpoint is based on the uploaded API documentation.
    // Replace the base URL with the provider's real host.
    const upstream = await fetch(`${base.replace(/\/$/,"")}/api/search/`, {
      method:"POST",
      headers:{
        "X-API-KEY":key,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({firstname, lastname}),
      cache:"no-store"
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = {raw:text}; }

    return NextResponse.json(data,{status:upstream.status});
  } catch (err) {
    return NextResponse.json({error:"Unable to contact the API."},{status:502});
  }
}
