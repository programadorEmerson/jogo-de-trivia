import { useMobileVerification } from "../../hooks/verify.mobile";

export const HideInMobile = ({ children }) => {
  const isMobile = useMobileVerification();
  return !isMobile && children;
};


