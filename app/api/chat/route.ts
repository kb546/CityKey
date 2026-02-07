import { NextRequest, NextResponse } from 'next/server';

// Demo responses for when no API key is configured
const DEMO_RESPONSES: Record<string, Record<string, string>> = {
    en: {
        default: `Great question! Here's what you need to know about living in Abu Dhabi:

**Step-by-step guide:**
1. First, make sure you have your Emirates ID ready
2. Visit the relevant government portal (TAMM app is your best friend!)
3. Submit the required documents

**Documents typically needed:**
• Emirates ID (original + copy)
• Passport with valid visa
• Proof of address (utility bill or tenancy contract)

**Where to go:**
• TAMM App (download from App Store/Play Store)
• TAMM Service Centers across Abu Dhabi
• Online at tamm.abudhabi

**Fees:** Vary by service, typically AED 50-200

Is there anything specific I can help you with? 😊`,
        electricity: `# Setting Up DEWA/ADDC Electricity

**For Abu Dhabi (ADDC):**

**Step 1: Gather Documents**
• Emirates ID (original)
• Tenancy contract (Tawtheeq registered)
• Passport copy with valid visa

**Step 2: Apply Online or In-Person**
• Online: Visit addc.ae
• App: Download ADDC app
• In-person: Any ADDC customer service center

**Step 3: Pay Fees**
• Connection fee: AED 100
• Security deposit: AED 2,000 (apartment) or AED 4,000 (villa)

**Processing time:** 1-3 business days

**Pro tip:** Make sure your Tawtheeq (tenancy registration) is complete before applying!

Need help with anything else? 🔌`,
    },
    ar: {
        default: `سؤال رائع! إليك ما تحتاج معرفته عن الحياة في أبوظبي:

**دليل خطوة بخطوة:**
1. أولاً، تأكد من أن هويتك الإماراتية جاهزة
2. قم بزيارة البوابة الحكومية المعنية (تطبيق تم هو صديقك الأفضل!)
3. قدم المستندات المطلوبة

**المستندات المطلوبة عادة:**
• الهوية الإماراتية (الأصل + نسخة)
• جواز السفر مع تأشيرة صالحة
• إثبات العنوان (فاتورة خدمات أو عقد إيجار)

**أين تذهب:**
• تطبيق تم (حمله من App Store/Play Store)
• مراكز خدمة تم في أنحاء أبوظبي
• عبر الإنترنت على tamm.abudhabi

**الرسوم:** تختلف حسب الخدمة، عادة 50-200 درهم

هل هناك شيء محدد يمكنني مساعدتك به؟ 😊`,
    },
    hi: {
        default: `बढ़िया सवाल! अबू धाबी में रहने के बारे में यह जानना ज़रूरी है:

**स्टेप-बाय-स्टेप गाइड:**
1. सबसे पहले, अपनी Emirates ID तैयार रखें
2. सही सरकारी पोर्टल पर जाएं (TAMM ऐप आपका सबसे अच्छा दोस्त है!)
3. ज़रूरी दस्तावेज़ जमा करें

**आमतौर पर ज़रूरी दस्तावेज़:**
• Emirates ID (ओरिजिनल + कॉपी)
• वैध वीज़ा वाला पासपोर्ट
• पते का प्रमाण (बिजली का बिल या किराया अनुबंध)

**कहाँ जाएं:**
• TAMM ऐप (App Store/Play Store से डाउनलोड करें)
• अबू धाबी में TAMM सेवा केंद्र
• ऑनलाइन: tamm.abudhabi

**फीस:** सेवा के अनुसार अलग, आमतौर पर AED 50-200

क्या कोई खास चीज़ है जिसमें मैं आपकी मदद कर सकता हूँ? 😊`,
    },
};

function getDemoResponse(message: string, language: string): string {
    const langResponses = DEMO_RESPONSES[language] || DEMO_RESPONSES.en;

    // Check for electricity-related keywords
    if (message.toLowerCase().includes('electricity') ||
        message.toLowerCase().includes('dewa') ||
        message.toLowerCase().includes('addc') ||
        message.toLowerCase().includes('power')) {
        return langResponses.electricity || langResponses.default;
    }

    return langResponses.default;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, language, systemPrompt, history } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENAI_API_KEY;

        // If no API key, return demo response
        if (!apiKey) {
            console.log('No OpenAI API key configured, using demo mode');
            const demoResponse = getDemoResponse(message, language || 'en');
            return NextResponse.json({ response: demoResponse, demo: true });
        }

        // Build messages array for OpenAI
        const messages = [
            { role: 'system', content: systemPrompt },
            ...history.map((msg: { role: string; content: string }) => ({
                role: msg.role,
                content: msg.content,
            })),
            { role: 'user', content: message },
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages,
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API error:', errorData);

            // Fall back to demo mode on API error
            const demoResponse = getDemoResponse(message, language || 'en');
            return NextResponse.json({ response: demoResponse, demo: true });
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content;

        if (!assistantMessage) {
            return NextResponse.json(
                { error: 'No response from AI' },
                { status: 500 }
            );
        }

        return NextResponse.json({ response: assistantMessage });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
