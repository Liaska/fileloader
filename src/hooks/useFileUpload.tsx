import axios from '../services/axios';

const UseFileUpload = (file: File, onUploadProgress: (progressEvent: any) => void) => {
  return axios.post('/upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

export default UseFileUpload;
