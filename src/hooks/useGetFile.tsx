import axios from '../services/axios';

const useGetFile = () => {
  return axios.get('/files');
};

export default useGetFile;
