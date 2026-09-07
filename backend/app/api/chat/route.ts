import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Get the user's message from the frontend
    const { message } = await req.json();

    // ====================================================================
    // 🧠 REAL AI INTEGRATION (Uncomment when you have an API key)
    // ====================================================================
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer process.env.OPENAI_API_KEY` // Add this to your .env.local file
      },
      body: JSON.stringify({
        model: 'gpt-4', 
        messages: [
          { role: 'system', content: 'You are an elite Enterprise AI Copilot analyzing SAP data and P&L metrics.' },
          { role: 'user', content: message }
        ]
      })
    });
    
    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
    */

    // ====================================================================
    // 🚧 TEMPORARY DYNAMIC ECHO (Delete when using the real AI above)
    // ====================================================================
    return NextResponse.json({ 
      reply: `I am your Next.js backend! I received your message: "${message}". Connect my OpenAI/Qwen API key in the code and I will start thinking for real.` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}