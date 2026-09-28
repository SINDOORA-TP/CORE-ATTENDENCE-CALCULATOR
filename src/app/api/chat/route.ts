import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const systemInstruction = `You are the "Attendance Advisor", a helpful AI assistant for college students. 
You have access to the student's current attendance data.
Here is the student's current state:
${JSON.stringify(context, null, 2)}

Your task is to answer their questions about their attendance. 
Be concise, helpful, and friendly. 
If they ask about taking leaves (like "If I take a 3-day sick leave starting tomorrow..."), you must read their current data, 
look at the 'remainingClasses' and their 'currentPercentage', and do the math to predict the outcome.
Remember the formula: (Classes Attended) / (Classes Conducted + Missed Classes) * 100.
Always remind them that the detention zone is strictly 75%.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/antigravity-preview-latest:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: 'Failed to generate response from Gemini API' }, { status: 500 });
    }

    const data = await apiResponse.json();
    
    // Extract the text response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ response: textResponse });
  } catch (error) {
    console.error('Error generating chat response:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
