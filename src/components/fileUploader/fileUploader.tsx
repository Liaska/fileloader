import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import UseFileUpload from '../../hooks/useFileUpload';
import UseGetFile from '../../hooks/useGetFile';

interface Props {}

const FileLoader = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [fileInfos, setFileInfos] = useState([]);

  // useEffect(() => {
  //   UseGetFile().then((response) => {
  //     setFileInfos(response.data);
  //   });
  // }, []);

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    if (!selectedFiles) {
      return;
    }
    setProgress(0);
    setCurrentFile(selectedFiles[0]);

    UseFileUpload(selectedFiles[0], (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        // return UseGetFile();
      })
      // .then((files) => {
      //   setFileInfos(files.data);
      // })
      .catch(() => {
        setProgress(0);
        setMessage('Could not upload the file!');
        setCurrentFile(null);
      });
  };

  return (
    <div>
      {currentFile && (
        <div className='progress'>
          <div className='progress-bar' style={{ width: progress + '%' }}>
            {progress}%
          </div>
        </div>
      )}

      <input ref={fileInputRef} onChange={selectFile} type='file' />
      <button onClick={() => fileInputRef.current?.click()}>Кнопочка для загрузки</button>

      <div>{message}</div>

      <ul>
        {fileInfos.length > 0 &&
          fileInfos.map((file, index) => (
            <li className='list-group-item' key={index}>
              <a href={file['url']}>{file['name']}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileLoader;
