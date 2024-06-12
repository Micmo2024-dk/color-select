import React, { useState } from 'react';
import styled from 'styled-components';
import { getRecommendedColors } from './common/api/gptapi.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const InputContainer = styled.form`
  display: flex;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const ColorCombo = styled.div`
  display: flex;
  margin: 0.5rem;
  border-radius: 10px;
  overflow: hidden;
`;

const ColorCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(${(props) => props.bgColor});
`;

const App = () => {
  const [message, setMessage] = useState('');
  const [recommendedColors, setRecommendedColors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colors = await getRecommendedColors(message);
    setRecommendedColors(colors);
  };

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <Button type="submit">Get Recommended Colors</Button>
      </InputContainer>
      <ColorContainer>
        {recommendedColors.length > 0 ? (
          recommendedColors.map((colors, index) => (
            <ColorCombo key={index}>
              {colors.map((rgb, idx) => (
                <ColorCircle key={idx} bgColor={rgb.join(', ')} />
              ))}
            </ColorCombo>
          ))
        ) : (
          <p>No recommended colors yet.</p>
        )}
      </ColorContainer>
    </Container>
  );
};

export default App;