import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

const FormSection = styled.div`
  font-size: 14px;
  margin: 20px 0px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Image = styled.img`
  max-height: 75px;
  margin-right: 10px;
`;

function ImageUpload ({ photos, setPhotos }) {
  const [displayPhotos, setDisplayPhotos] = useState(null);

  useEffect (() => {
    if (photos.length > 0) {
      setDisplayPhotos(
        <FormSection>
          <ThumbnailContainer>
            {photos.map((photo, index) =>
              <Image key={index} src={photo}/>
            )}
          </ThumbnailContainer>
        </FormSection>
      );
    }
  }, [photos])

  const handlePhotos = (event) => {
    const uploadedPhotos = event.target.files;

    if (uploadedPhotos.length > 5) {
      alert('You can only upload a maximum of five files');
    } else {
      for (let i = 0; i < uploadedPhotos.length; i++) {
        const formData = new FormData();
        formData.append("file", uploadedPhotos[i]);
        formData.append("upload_preset", 'fjmeciqe');
        uploadPhotos(formData);
      }
    }
  }

  const uploadPhotos = (photo) => {
    axios.post(`https://api.cloudinary.com/v1_1/dgn6fimlv/image/upload`, photo)
    .then((photo) => {setPhotos(prevArray => prevArray.concat(photo.data.url))})
    .catch((err) => {console.log(err)})
  }

  return (
    <div>
      <input
      type='file'
      name='image'
      onChange={handlePhotos}
      multiple/>
    {displayPhotos}
    </div>
  );
}

export default ImageUpload;