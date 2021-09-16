import { useHistory } from "react-router-dom";

function useLastLocationHistory() {
  const history = useHistory();

  const change = (path) => {
    history.push(path);
  };

  return change;
}

export default useLastLocationHistory;
