import React, { useEffect, useRef } from "react";
import styles from "./container.module.css";
import { Button } from "@mui/material";
// import img from "../assets/logo512.png";
import axios from '../tools/axios';
import CircularProgress from '@mui/material/CircularProgress';

const Container = () => {
  const fileInputRef = useRef(null);

  const [originalImage, setOriginalImage] = React.useState<string>("");
  const [editedImage, setEditedImage] = React.useState<string>("");

  const [poolingFlag, setPoolingFlag] = React.useState<boolean>(false);

  useEffect(() => {
    if (poolingFlag) {
      const interval = setInterval(async () => {
        const res = await axios.post('/process/check');
        if (res && res.data.flag) {
          setPoolingFlag(false);
          const urlArray = res.data.data.url.split('_');
          setOriginalImage(urlArray[0])
          setEditedImage(urlArray[1]);
          console.log(res.data.data)
        }
      }, 100);
      return (() => clearInterval(interval));
    }
  }, [poolingFlag])

  useEffect(() => {
    axios.post('/process/test').then(res => { console.log(res) }).catch(err => { console.log(err) })
  }, [])

  const uploadTrigger = () => {
    const currentElement: any = fileInputRef.current
    currentElement.click();
  };

  const fileSelectHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('name', file.name);
      return formData;
    }
  };

  const fileUploadHanlder = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = await fileSelectHandler(e);
    const res = await axios.post('/process/upload', formData);
    if (res && res.data.flag) {
      const url = res.data.data.url;
      setOriginalImage(url);
      console.log(res.data.msg)
    }
  }

  const processHandler = async () => {
    // signal start process
    const res = await axios.post('/process/process');
    if (res && res.data.flag) {
      setPoolingFlag(true);
      console.log(res.data.msg)
    }
  };

  const downloadHanlder = () => {
    if (editedImage !== '') {
      const downloadedFileName = 'photo.jpg';
      // Create an anchor element
      const link = document.createElement('a');
      // Set the href and download attributes
      link.href = editedImage;
      //blank_ to open in new tab
      link.target = '_blank';
      link.download = downloadedFileName;
      link.style.display = 'none';
      // Append the link to the document, click on it, and remove it from the document
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const resetHandler = () => {
    setEditedImage('');
    setOriginalImage('');
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.cover}>
          {originalImage !== ""
            ? <img src={originalImage} alt="originImage" />
            : <Button onClick={uploadTrigger}>Upload</Button>}
        </div>
        <div className={styles.cover}>
          {editedImage !== "" ? <img src={editedImage} alt="editedImage" />
            : (poolingFlag ? <CircularProgress /> : <Button onClick={processHandler}>Process</Button>)}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div>
          <Button onClick={resetHandler} variant="outlined">Reset</Button>
          <Button disabled={editedImage === ''} onClick={downloadHanlder} sx={{ marginLeft: '1rem' }} variant="contained">Download</Button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={fileUploadHanlder}
      />
    </div>
  );
};

export default Container;
