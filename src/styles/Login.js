import { Grid, Paper, styled } from "@mui/material";

export const CustomGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/2384075.jpg");
`;

export const CustomFormLogin = styled("form")`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CustomGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const CustomPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  width: 100%;
  padding: 3rem 0;
  border-radius: 1rem;
`;

export const CustomImageLogo = styled("img")`
  width: 15rem;
`;
