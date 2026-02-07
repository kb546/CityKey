import { LanguageCode, LANGUAGES } from '@/context/LanguageContext';

// System prompts for the AI
const CHAT_SYSTEM_PROMPT = `You are CityKey, a friendly AI assistant that helps expats navigate
life in Abu Dhabi, UAE. The user's language is: {LANGUAGE_NAME}.
Always respond in {LANGUAGE_NAME}.

You have expert knowledge of UAE government services:
- TAMM (Abu Dhabi's government services app)
- DEWA (Dubai Electricity and Water Authority)
- ADDC (Abu Dhabi Distribution Company — electricity/water)
- RTA (Roads and Transport Authority — vehicle registration, driving licenses)
- ADEK (Abu Dhabi Department of Education and Knowledge)
- ICP (Identity and Citizenship Authority — Emirates ID, visas)
- Banking (ADCB, FAB, Emirates NBD — account opening)
- Housing (tenancy contracts, Tawtheeq registration, Ejari)
- Health (mandatory insurance, Daman, SEHA hospitals)

Rules:
1. Always give step-by-step instructions
2. Always list the specific documents needed
3. Always mention fees when applicable
4. Always say WHERE to go (website, app, or physical location)
5. Keep it practical — no fluff
6. Keep proper nouns in English (DEWA, RTA, etc.) even when responding in other languages
7. If you're unsure about something, say so — don't make up info
8. Be warm and encouraging — moving to a new country is stressful`;

const DOCUMENT_SYSTEM_PROMPT = `You are CityKey's Document Explainer. The user speaks {LANGUAGE_NAME}.
They have pasted an Arabic document (likely a UAE tenancy contract,
government notice, or official form).

Break down the document section by section in {LANGUAGE_NAME}:
1. Give each section a clear heading
2. Explain what it says in simple, everyday language
3. Highlight key numbers (amounts, dates, durations)
4. Flag anything the user should pay special attention to
5. Keep proper nouns and legal terms in their original form with a translation

End with this disclaimer: "This is an AI-generated summary for
informational purposes. For legal matters, please consult a
certified translator or legal advisor."`;

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

/**
 * Send a chat message to the AI and get a response
 */
export async function sendChatMessage(
    message: string,
    language: LanguageCode,
    history: ChatMessage[] = []
): Promise<string> {
    const languageName = LANGUAGES[language].name;
    const systemPrompt = CHAT_SYSTEM_PROMPT.replace(/{LANGUAGE_NAME}/g, languageName);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                language,
                systemPrompt,
                history,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to get response');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
}

/**
 * Explain an Arabic document in the user's language
 */
export async function explainDocument(
    document: string,
    language: LanguageCode
): Promise<string> {
    const languageName = LANGUAGES[language].name;
    const systemPrompt = DOCUMENT_SYSTEM_PROMPT.replace(/{LANGUAGE_NAME}/g, languageName);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Please explain this Arabic document:\n\n${document}`,
                language,
                systemPrompt,
                history: [],
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to explain document');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Document explainer error:', error);
        throw error;
    }
}
