import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "model/authModel";
import tokenStorage from "utils/tokenStorage";
import { ACCESS_TOKEN_KEY } from "constants/key";
import { API } from "api/axios";

function RouteHandlerViewModel() {
  const location = useLocation();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const updateAuth = () => {
    const storage = tokenStorage(ACCESS_TOKEN_KEY);
    const accessToken = storage.get();
    const isAuthed = !!accessToken;

    if (isAuthed) {
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setAccessToken(accessToken);
    }
  };

  useEffect(() => {
    updateAuth();
  }, [location.pathname]);

  return <div />;
}

export default RouteHandlerViewModel;
