import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "components/atoms/Auth/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function AuthRequired({ children }: Props) {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      alert("로그인이 필요해요.");
      navigate("/?needToLogin=true");
    }
  }, [isAuthorized]);

  // eslint-disable-next-line react/jsx-no-useless-fragment, react/react-in-jsx-scope
  return <>{isAuthorized && children}</>;
}
