'use server'

// my-app/app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
    // Get the request body
    const body = await req.json();

    // If the body has a url, print it to the server
    if (body.url) {
        console.log(`URL: ${body.url}`);
    }

    // Create a variable for the url and name it file_url
    const file_url = body.url;



    // Make a POST request to the Python backend
    const response = await fetch('https://patelchanakya--transcription-app-fastapi-app.modal.run/transcribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_url }),
    });


    // Check if the request was successful
    if (!response.ok) {
        return NextResponse.json({ error: 'Request to Python backend failed' });
    }

    // Get the response data
    const data = await response.json();

    // Return the response data
    return NextResponse.json(data);
}