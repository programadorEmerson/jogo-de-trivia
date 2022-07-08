
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { PaperSlice } from "../styles/Game";


import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import resultado from "../assets/resultado.jpeg";
import { CustomBoxFeedback, CustomStackFeedback } from "../styles/Feedback";
import { CustomMain } from "../styles/Shared";

const Feedback = () => {
  const { email, score, assertions } = useSelector((state) => ({ ...state.player }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <div>
      {email && (
        <Fragment>
          <Header />
          <CustomMain>
            <PaperSlice sx={{ minHeight: "400px" }} elevation={3}>
              <CustomBoxFeedback>
                <CustomStackFeedback spacing={1} direction="column">
                  <img src={resultado} alt="Timmer" width={170} />
                  <span>Acertos: {assertions}</span>
                  <span>Sua pontuação: {score}</span>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate("/ranking")}
                  >
                    Ver Ranking
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate("/")}
                  >
                    Jogar Novamente
                  </Button>
                </CustomStackFeedback>
              </CustomBoxFeedback>
            </PaperSlice>
          </CustomMain>
        </Fragment>
      )}
    </div>
  );
};

export default Feedback;
