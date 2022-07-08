import { Box, Paper, Stack, styled } from "@mui/material";

export const CustomPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 80%;
  border-radius: 1rem;
  background-color: rgba(236, 240, 241, 0.4);
`;

export const CustomStack = styled(Stack)`
  border-radius: 0.7rem;
`;

export const ContainnerPapers = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

export const PaperSlice = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.7rem;
  width: 300px;
  height: 300px;
`;

