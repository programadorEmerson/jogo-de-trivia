import { useMobileVerification } from "../hooks/verify.mobile";
import {
  CustomFormLogin,
  CustomGrid,
  CustomGridItem,
  CustomImageLogo,
  CustomPaper
} from "../styles/Login";
import { AccountCircle, EmailOutlined } from "@mui/icons-material";
import { Send as SendIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AlertNotification } from "../components/AlertNotification";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { ButtonSettings } from "../components/DialogConfig";
import { useDispatch, useSelector } from "react-redux";
import { getNewQuestion, requestApiToken } from "../services/api";
import { setPlayer } from "../redux/actons";
import { setAllQuestions, setInitQuestions } from "../redux/actons";
import { CustomStack } from "../styles/Shared";

import abertura from "../assets/abertura.mp3";
let audio = new Audio();

const initialValues = {
  email: "",
  playerName: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("É necessário uso de um e-mail válido!")
    .required("O campo email não pode ser vazio!"),
  playerName: yup.string().required("O campo nome não pode estar vazio!"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMobileVerification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { difficulty, category } = useSelector((state) => ({
    ...state.player,
    ...state.questions,
  }));

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(setInitQuestions());
  }, [dispatch]);

  useEffect(() => {
    audio = new Audio(abertura);
    audio.play();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (loginData) => {
      setIsLoading(true);
      try {
        dispatch(setPlayer({ ...loginData, score: 0, assertions: 0 }));
        const token = await requestApiToken();
        const questions = await getNewQuestion({
          difficulty,
          category,
          token,
        });
        dispatch(setAllQuestions(questions));
        setIsLoading(false);
        AlertNotification({
          type: "success",
          message: `Seja bem vindo ${loginData.playerName.split(" ")[0]}!`,
        });
        audio.pause();
        navigate("/game-page");
      } catch (error) {
        const message = "Dados de acesso inválidos";
        AlertNotification({ type: "error", message });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <CustomGrid container spacing={0}>
      <CustomGridItem item sm={isMobile ? 12 : 6}>
        <CustomPaper elevation={3}>
          <CustomFormLogin onSubmit={formik.handleSubmit}>
            <CustomStack
              spacing={2}
              sx={{ padding: isMobile ? "0 2rem" : "0 2rem" }}
            >
              <Loading trigger={isLoading} message="Efetuando login" />
              <CustomImageLogo onClick={() => audio.play()} src={logo} alt="Logo do jogo Trivia" />
              <Typography variant="body1" gutterBottom component="div">
                Informe seus dados
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Informe seu email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="playerName"
                name="playerName"
                label="Informe seu nome"
                size="small"
                fullWidth
                value={formik.values.playerName}
                onChange={formik.handleChange}
                error={
                  formik.touched.playerName && Boolean(formik.errors.playerName)
                }
                helperText={
                  formik.touched.playerName && formik.errors.playerName
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
              >
                Começar o Jogo
              </Button>
              <ButtonSettings />
            </CustomStack>
          </CustomFormLogin>
        </CustomPaper>
      </CustomGridItem>
    </CustomGrid>
  );
};
export default Login;
