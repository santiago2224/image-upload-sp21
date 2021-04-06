import React, { useState, useEffect } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button, Image } from "semantic-ui-react";
import axios from 'axios'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function FilePondEx1() {
  const [files, setFiles] = useState([]);
  const [uzers, setUzers] = useState([])

  useEffect(()=>{
      getUzers()
  },[])

  const getUzers = async()=>{
      let res = await axios.get('/api/uzers')
      setUzers(res.data)
  }

  const handleClick = async ()=>{
      console.log(files)
    //   files[0].file; file is the thing I want to send to backend
    try {
       let data = new FormData()
        // files[0].file  this will come in as params file
       data.append('file', files[0].file)
    //    data.append('x', 'x here')
       let res  = await axios.post('/api/test_upload1?name=Tony&age=12', data)
       console.log(res.data)
    } catch(err) {
      console.log(err)
      console.log(err.response.data)
      alert('error occurred')
    }
  }
  return (
    <div className="App">
      <FilePond
        files={files}
        allowReorder={true}
        // allowMultiple={true}
        allowMultiple={true}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <Button onClick={handleClick}>add</Button>
      {uzers.length >= 1 && <Image src={uzers[0].image} />}
    </div>
  );
}

export default FilePondEx1

