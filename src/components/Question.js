import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timeOut, setTimeOut] = useState()

  // add useEffect code
  useEffect(()=>{
    setInterval(() => {
      setTimeOut(() => {
        setTimeRemaining(timeRemaining - 1)
      })
    }, 1000)
  }, [timeRemaining])

  useEffect(() => {
    const timer = setTimeOut(() => {
      onAnswered(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [timeOut])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
