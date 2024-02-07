import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../store/AuthCtxProvider';

export default function useApiData(apiUrl, initValue = []) {
  const [dataArr, setDataArr] = useState(initValue);
  const [apiErr, setApiErr] = useState({});
const {token} = useAuthContext()

  let configs = {};
    if (token !== '') {
        configs = {
            headers: {'Authorization': `Bearer ${token}`}
        }
    }

  useEffect(() => {
    axios
      .get(apiUrl, configs)
      .then((response) => {
        console.log('response ===', response);
        const commFromAPI = response.data;
        setDataArr(commFromAPI);
      })
      .catch((error) => {
        console.log('useApiData errro ===', error);
        setApiErr(error);
      });
  }, [apiUrl]);

  return [dataArr, setDataArr, apiErr];
}
