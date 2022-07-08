import { Stack, styled } from "@mui/material";

export const CustomMain = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 65px);
  background-image: url("https://wallpaperaccess.com/full/2384075.jpg");
`;

export const CustomStack = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;