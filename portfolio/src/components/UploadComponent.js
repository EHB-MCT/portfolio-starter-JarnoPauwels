import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const UploadComponent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('gltfFile', file);
    const user_id = localStorage.getItem('userId');
    formData.append('user_id', user_id);

    try {
      const response = await fetch('http://localhost:3000/uploads', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      navigate('/display');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload GLTF (.glb) File</button>
    </div>
  );
};

export default UploadComponent;
