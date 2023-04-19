import { Box, Button, Paper, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import JSConfetti from "js-confetti";
import { CustomPaper, CustomStack, PaperSlice } from "../styles/Game";

import chatImage from "../assets/chat.png";
import university from "../assets/university.jpeg";
import seconds from "../assets/20seconds.jpg";
import certaResposta from "../assets/certa-resposta.mp3";
import errouQuePEna from "../assets/quePena.mp3";
import novaPergunta from "../assets/novaPergunta.mp3";
import helpMusic from "../assets/helpMusic.mp3";
import suspense from "../assets/suspense.mp3";

import {
  setAnswered,
  setAssertions,
  setNewScore,
  setUpdateTimmer,
} from "../redux/actons";

import timmer from "../assets/ampulheta.gif";
import errou from "../assets/errou.png";
import acertou from "../assets/acertou.png";

import { Fragment, useEffect, useState } from "react";
import { handleAddPlayerInLocalStorage } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CustomMain } from "../styles/Shared";

const ONE = 1;
const ONE_SECOND = 1000;
const TWO = 2;
const THREE = 3;
const TIME = 30;
const DEFAULT_POINTS = 10;

const audioHelp = new Audio(helpMusic);
const correctAnswer = new Audio(certaResposta);
const wrongAnswer = new Audio(errouQuePEna);
const newQuestion = new Audio(novaPergunta);
let suspenseMusic = new Audio(suspense);

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(TIME);
  const [imageType, setImageType] = useState(errou);
  const [enabledHelp, setEnabledHelp] = useState([false, false, false]);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const jsConfetti = new JSConfetti();

  const {
    score,
    email,
    playerName,
    timeLeft,
    difficulty,
    answered,
    questions,
    assertions,
  } = useSelector((state) => ({ ...state.player, ...state.questions }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSumTotalPoints = (isCorrect) => {


    let pointsDificulty = ONE;

    if (difficulty === "medium") {
      pointsDificulty = TWO;
    } else if (difficulty === "hard") {
      pointsDificulty = THREE;
    }

    const points = DEFAULT_POINTS + timeLeft * pointsDificulty;
    if (isCorrect) dispatch(setNewScore(score + points));
  };

  function decodeEntity(inputStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  function handleHelp(type) {
    suspenseMusic.pause();
    switch (type) {
      case 'chat':
        setEnabledHelp((prev) => [true, prev[1], prev[2]]);
        createTimerHelp();
        break;
      case 'university':
        setEnabledHelp((prev) => [prev[0], true, prev[2]]);
        createTimerHelp();
        break;
      case 'jump':
        setEnabledHelp((prev) => [prev[0], prev[1], true]);
        createTimerHelp();
        break;
      default:
        break;
    }
  }

  const createTimerHelp = () => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 1000);
    setIntervalId(interval);
    audioHelp.play();
  };

  useEffect(() => {
    if (progress === 20) {
      clearInterval(intervalId);
      setProgress(0);
    }
  }, [intervalId, progress]);

  useEffect(() => {
    newQuestion.play();
    suspenseMusic.play();
  }, []);


  const handleChooseAnswer = (isCorrect) => {
    if (answered) return;
    const lastQuestion = questions.length - 1 === currentQuestion;
    dispatch(setAnswered(true));
    suspenseMusic.pause();
    if (isCorrect) {
      dispatch(dispatch(setAssertions(assertions + 1)));
      setImageType(acertou);
      correctAnswer.play();
      jsConfetti.addConfetti();
    } else {
      setImageType(errou);
      wrongAnswer.play();
    }
    setProgress(20);
    handleSumTotalPoints(isCorrect);
    setLastQuestion(lastQuestion);
  };

  const handleNext = () => {
    suspenseMusic = new Audio(suspense);
    if (!lastQuestion && currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setLastQuestion(false);
      dispatch(setAnswered(false));
      dispatch(setUpdateTimmer(TIME));
      setElapsedTime(TIME);
      newQuestion.play();
      suspenseMusic.play();
    } else {
      handleAddPlayerInLocalStorage({ email, playerName, score, assertions });
      navigate("/feedback");
      suspenseMusic.pause();
    }
  };

  useEffect(() => {
    if (elapsedTime === 0) {
      dispatch(setAnswered(true));
    } else {
      if (!answered && progress === 0) {
        setTimeout(() => {
          const currentTimmer = elapsedTime - 1;
          setElapsedTime(currentTimmer);
          dispatch(setUpdateTimmer(currentTimmer));
        }, ONE_SECOND);
      }
    }
    console.log('timer help: ', 20 - progress)
  }, [answered, dispatch, elapsedTime, progress]);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [dispatch, email, navigate]);



  return (
    <div>
      {email && (
        <Fragment>
          <Header />
          <CustomMain>
            <CustomPaper elevation={3}>
              <CustomStack spacing={2} direction="row">
                <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" >
                  <Paper elevation={3} sx={{ width: '80px', height: '80px' }}>
                    <Button
                      disabled={enabledHelp[0]}
                      onClick={() => handleHelp('chat')}
                      sx={{ padding: '0', margin: '0', opacity: enabledHelp[0] ? '0.20' : '1' }}
                    >
                      <img src={chatImage} alt="chat" width={80} height={80} />
                    </Button>
                  </Paper>
                  <Paper elevation={3} sx={{ width: '80px', height: '80px' }}>
                    <Button
                      disabled={enabledHelp[1]}
                      onClick={() => handleHelp('university')}
                      sx={{ padding: '0', margin: '0', opacity: enabledHelp[1] ? '0.20' : '1' }}
                    >
                      <img src={university} alt="chat" width={80} height={80} />
                    </Button>
                  </Paper>
                  <Paper elevation={3} sx={{ width: '80px', height: '80px' }}>
                    <Button
                      disabled={enabledHelp[2]}
                      onClick={() => handleHelp('jump')}
                      sx={{ padding: '0', margin: '0', opacity: enabledHelp[2] ? '0.20' : '1' }}
                    >
                      <img src={seconds} alt="chat" width={80} height={80} />
                    </Button>
                  </Paper>
                </Box>
                <PaperSlice elevation={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={1}
                      direction="column"
                    >
                      <img
                        src={answered ? imageType : timmer}
                        alt="Timmer"
                        width={answered ? 150 : 200}
                      />
                      <span>Pontuação: {score}</span>
                      {progress === 0 && <span>Tempo restante: {elapsedTime}</span>}
                      {answered && (
                        <Button
                          fullWidth
                          variant="contained"
                          type="button"
                          className={"btn-next"}
                          data-testid="btn-next"
                          onClick={() => handleNext()}
                        >
                          Próxima Pergunta
                        </Button>
                      )}
                      {progress > 0 && (
                        <Button
                          fullWidth
                          variant="contained"
                          type="button"
                          className={"btn-next"}
                          data-testid="btn-next"
                          onClick={() => handleNext()}
                        >
                          {`Tempo de ajuda: ${20 - progress} segundos`}
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </PaperSlice>
                <PaperSlice sx={{ width: "500px" }} elevation={3}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      padding: "0rem 0.5rem",
                    }}
                  >
                    <span
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}
                    />
                    <Stack width="100%" spacing={1} direction="column">
                      {questions[currentQuestion].answers.map(
                        (answer, index) => {
                          const { correct_answer: correct } =
                            questions[currentQuestion];
                          const isCorrect = correct === answer;
                          const dataTestId = isCorrect
                            ? "correct-answer"
                            : "wrong-answer";
                          if (isCorrect)
                            console.log("correct", answer);

                          return (
                            <Button
                              fullWidth
                              variant="contained"
                              color={
                                !answered
                                  ? "primary"
                                  : isCorrect
                                    ? "success"
                                    : "error"
                              }
                              type="button"
                              className={answered ? dataTestId : ""}
                              key={index}
                              data-testid={
                                isCorrect
                                  ? dataTestId
                                  : `${dataTestId}-${index}`
                              }
                              onClick={() => handleChooseAnswer(isCorrect)}
                            >
                              {decodeEntity(answer)}
                            </Button>
                          );
                        }
                      )}
                    </Stack>
                  </Box>
                </PaperSlice>
              </CustomStack>
            </CustomPaper>
          </CustomMain>
        </Fragment>
      )}
    </div>
  );
};

export default Game;
