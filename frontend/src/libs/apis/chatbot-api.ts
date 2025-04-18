import { BASE_URL } from "./reusable-api";

export const sendChatMessageStream = async (
  sessionId: string,
  messageData: Record<string, any>,
  onStreamChunk: (chunk: string) => void
) => {
  const url = `${BASE_URL}/chatbot/${sessionId}/chat`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stream: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader!.read();
      done = readerDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        onStreamChunk(chunk); // Process each chunk
      }
    }

  } catch (error) {
    console.error('Error while streaming chatbot response:', error);
    throw error;
  }
};

export const getFollowUpSuggestions = async (
  sessionId: string,
  historyContext: Record<string, any>
): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/chatbot/suggestions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(historyContext),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
  }

  const data = await response.json();
  return data.suggestions;
};

