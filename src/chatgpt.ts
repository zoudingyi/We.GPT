import axios from 'axios';

interface Data {
  model: string;
  messages: Array<Object>;
  temperature: Number;
}

export const sendMessage = async (message: String) => {
  const data: Data = {
    model: process.env.MODEL ?? 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const { content } = response.data.choices[0].message;
    return content;
  } catch (error) {
    console.log('error :>> ', error);
    return 'error :>> ' + error;
  }
};
