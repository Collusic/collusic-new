import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "model/authModel";
import tokenStorage from "utils/tokenStorage";
import { ACCESS_TOKEN_KEY } from "constants/key";
import { API } from "api/axios";
import { modalOpenState } from "model/signInModel";

function RouteHandlerViewModel() {
  const location = useLocation();
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setIsModalOpen = useSetRecoilState(modalOpenState);

  const updateAuth = () => {
    const storage = tokenStorage(ACCESS_TOKEN_KEY);
    const accessToken = storage.get();
    const isAuthed = !!accessToken;

    if (isAuthed) {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  };

  useEffect(() => {
    updateAuth();
    if (location.search.includes("needToLogin=true")) {
      setAccessToken(null);
      setIsModalOpen(true);
    }
  }, [location.pathname]);

  return <div />;
}

export default RouteHandlerViewModel;
