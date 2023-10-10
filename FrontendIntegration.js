import axios from 'axios';

const uploadImage = async (imageUri) => {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg', // Adjust the type as needed (e.g., 'image/png' for PNG images)
    name: 'image.jpg',
  });

  try {
    const response = await axios.post('http://your-backend-url/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data); // Response will contain the image URL
  } catch (error) {
    console.error(error);
  }
};
