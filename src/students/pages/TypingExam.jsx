import React, { useState, useEffect, useRef } from "react";
import "./css/TypingExam.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TypingExam = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [duration, setDuration] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [inputText, setInputText] = useState("");
  const [correctText, setCorrectText] = useState("");
  const [examFinished, setExamFinished] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const paragraphRef = useRef(null); // Reference to the paragraph container
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypingTest = async () => {
      try {
        const examId = localStorage.getItem("examId");
        if (!examId) {
          alert("Exam ID not found in localStorage!");
          return;
        }

        const response = await axios.get(
          `https://iems.onrender.com/institute/${examId}/typing-test`
        );
console.log(response.data)
        const { passage, duration } = response.data.typingTest;

        if (passage && duration) {
          setCorrectText(passage);
          setTimeLeft(duration * 60);
          setDuration(duration * 60);
          setHighlightedText(highlightCorrectWords(""));
        } else {
          alert("Typing test data is invalid or missing.");
        }
      } catch (error) {
        alert(`Failed to fetch typing test: ${error.response?.data || error.message}`);
      }
    };

    fetchTypingTest();
  }, []);

  useEffect(() => {
    setHighlightedText(highlightCorrectWords(inputText));

    if (timeLeft > 0 && !examFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 || examFinished) {
      clearInterval(intervalRef.current);
      setExamFinished(true);
    }

    return () => clearInterval(intervalRef.current);
  }, [timeLeft, examFinished]);

  useEffect(() => {
    setHighlightedText(highlightCorrectWords(inputText));

    // Scroll paragraph container to keep the active area visible
    if (paragraphRef.current) {
      const activeText = paragraphRef.current.querySelector(".not-typed, .incorrect");
      if (activeText) {
        activeText.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    calculateWpm(e.target.value);
  };

  const calculateWpm = (typedText) => {
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const minutesElapsed = (duration - timeLeft) / 60;
    const calculatedWpm = minutesElapsed > 0 ? Math.round(wordsTyped / minutesElapsed) : 0;

    setWpm(calculatedWpm);
  };

  const highlightCorrectWords = (typedText) => {
    const typedChars = typedText.split("");
    const correctChars = correctText.split("");

    return correctChars
      .map((char, index) => {
        if (index < typedChars.length) {
          if (typedChars[index] === char) {
            return `<span class="correct">${char}</span>`;
          } else {
            return `<span class="incorrect">${char}</span>`;
          }
        } else {
          return `<span class="not-typed">${char}</span>`;
        }
      })
      .join("");
  };

  const isExamCompleted = inputText.length >= correctText.length || timeLeft === 0;

  return (
    <div className="typing">
      <div className="wrapper">
        <div className="content-box">
          <div className="typing-text" ref={paragraphRef}>
            <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </div>
          <div className="content">
            <ul className="result-details">
              <li className="time">
                <p>Time Left:</p>
                <span className="color">
                  <>{Math.floor(timeLeft / 60).toString().padStart(2, "0")}</>:
                  <>{(timeLeft % 60).toString().padStart(2, "0")}</> <b>min</b>
                </span>
              </li>
              <li className="wpm">
                <p>WPM:</p>
                <span className="color">{wpm}</span>
              </li>
            </ul>
            {isExamCompleted && (
              <button
                className="showExam"
                onClick={() => {
                  localStorage.setItem("wpm", wpm);
                  navigate("/exam/");
                }}
              >
                Finish
              </button>
            )}
          </div>
        </div>
        <textarea
          name="input-field"
          placeholder="Click here to type..."
          className="input-field"
          value={inputText}
          onChange={handleInputChange}
          disabled={isExamCompleted}
        ></textarea>
      </div>
    </div>
  );
};

export default TypingExam;
