import { useSelector } from "react-redux";
import Header from "../components/Header";

import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CardHeader } from "@mui/material";

import {
  handleGetAllPlayersOfLocalStorage,
  userGravatarUrl,
} from "../services/api";
import { CustomBoxRanking, CustomCardRanking } from "../styles/Ranking";
import { CustomMain, CustomStack } from "../styles/Shared";

const Ranking = () => {
  const { email } = useSelector((state) => ({ ...state.player }));
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
          <CustomMain sx={{ flexDirection: "column" }}>
            <CustomStack spacing={1} direction="column">
              <CustomBoxRanking>
                {handleGetAllPlayersOfLocalStorage()
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <CustomCardRanking key={index}>
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={player.playerName}
                            src={userGravatarUrl(player.email)}
                          />
                        }
                        title={player.playerName}
                        subheader={`Acertos: ${player.score}\nPontuação: ${player.score}`}
                      />
                    </CustomCardRanking>
                  ))}
              </CustomBoxRanking>
              <Button
                color="error"
                sx={{ width: "400px" }}
                variant="contained"
                onClick={() => navigate("/")}
              >
                Novo Jogo
              </Button>
            </CustomStack>
          </CustomMain>
        </Fragment>
      )}
    </div>
  );
};

export default Ranking;
