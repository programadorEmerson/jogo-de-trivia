import { Box, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import JSConfetti from "js-confetti";
import { CustomPaper, CustomStack, PaperSlice } from "../styles/Game";

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

const TIME = 30;

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(30);
  const [imageType, setImageType] = useState(errou);
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
    const DEFAULT_POINTS = 10;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;

    let pointsDificulty = ONE;

    if (difficulty === "medium") {
      pointsDificulty = TWO;
    } else if (difficulty === "hard") {
      pointsDificulty = THREE;
    }

    const points = DEFAULT_POINTS + timeLeft * pointsDificulty;
    if (isCorrect) dispatch(setNewScore(score + points));
  };

  const handleChooseAnswer = (isCorrect) => {
    if (answered) return;
    const lastQuestion = questions.length - 1 === currentQuestion;
    dispatch(setAnswered(true));
    if (isCorrect) {
      dispatch(dispatch(setAssertions(assertions + 1)));
      setImageType(acertou);
      jsConfetti.addConfetti();
    } else {
      setImageType(errou);
    }
    handleSumTotalPoints(isCorrect);
    setLastQuestion(lastQuestion);
  };

  const handleNext = () => {
    const INITIAL_TIMMER = 30;
    if (!lastQuestion && currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setLastQuestion(false);
      dispatch(setAnswered(false));
      dispatch(setUpdateTimmer(INITIAL_TIMMER));
      setElapsedTime(TIME);
    } else {
      handleAddPlayerInLocalStorage({ email, playerName, score, assertions });
      navigate("/feedback");
    }
  };

  useEffect(() => {
    if (elapsedTime === 0) {
      dispatch(setAnswered(true));
    } else {
      if (!answered) {
        setTimeout(() => {
          const currentTimmer = elapsedTime - 1;
          setElapsedTime(currentTimmer);
          dispatch(setUpdateTimmer(currentTimmer));
        }, 1000);
      }
    }
  }, [answered, dispatch, elapsedTime]);

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
                      <span>Tempo restante: {elapsedTime}</span>
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
                    <span style={{ textAlign: "justify" }}>
                      {questions[currentQuestion].question}
                    </span>
                    <Stack width="100%" spacing={1} direction="column">
                      {questions[currentQuestion].answers.map(
                        (answer, index) => {
                          const { correct_answer: correct } =
                            questions[currentQuestion];
                          const isCorrect = correct === answer;
                          const dataTestId = isCorrect
                            ? "correct-answer"
                            : "wrong-answer";
                          // if (isCorrect)
                          //   console.log("correct", answer);

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
                              {answer.normalize()}
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
