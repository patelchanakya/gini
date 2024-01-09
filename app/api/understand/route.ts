'use server'

// my-app/app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
    // Get the request body
    const body = await req.json();



    // Make a POST request to the Python backend
    const response = await fetch('https://patelchanakya--transcription-app-fastapi-app.modal.run/understand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
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