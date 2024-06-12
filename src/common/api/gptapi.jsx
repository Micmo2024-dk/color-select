import axios from 'axios';

const OPENAI_API_KEY = 'sk-proj-HLFEbdCtcoDSKUUrybRuT3BlbkFJ4aNarznzW7wEyRqP5UQi';

export const getRecommendedColors = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `야 ${message}이랑 어울리는 색 조합을 10가지 추천해줘. 
            추천할 때 색 3개 조합해주고 프론트에서 변환하게 색 grb(~)식으로 추천해주라 
            rgb값만 리스트 형식으로 넘겨주라 다른 잡언 다 제거하고
            그리고 색상을 조금 다양하고 실제로 활용되게끔 추천해줘 최대한 안겹치게
            타겟은 마케팅이니까 그것도 감안하고 진짜 현업에서 당장 써도 될만큼 잘 생각해봐
            대충 주지 말고 너무 단색 보다는 파스텔 색감도 괜찮어`,
          },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const recommendedColors = response.data.choices[0].message.content
      .split('\n')
      .map((line) => JSON.parse(line));

    return recommendedColors;
  } catch (error) {
    console.error(error);
    return [];
  }
};