const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid'); //  UUID for unique image names
require('dotenv').config();
const CustomeError = require('../../utils/errors/customError');

class ImgBBService {
    constructor() {
        this.apiKey = process.env.IMAGEBB_API_KEY;
        this.baseURL = 'https://api.imgbb.com/1/upload';
    }

    static async uploadImage(imageBuffer) {
        const formData = new FormData();
        formData.append('image', imageBuffer.toString('base64')); // Convert buffer to Base64

        // Generate a unique name for the image
        const imageName = `image-${uuidv4()}`;

        try {
            const response = await axios.post(`${this.baseURL}?key=${this.apiKey}`, formData, {
                headers: formData.getHeaders(),
            });

            if (response.data.success) {
                return {
                    name: imageName,
                    url: response.data.data.url,
                    deleteUrl: response.data.data.delete_url, // Optional for deletions
                };
            } else {
                throw new CustomeError(response.data.error.message, 400);
            }
        } catch (error) {
            console.error('Error uploading to imgBB:', error.message);
            throw new CustomeError(response.data.error.message, 400);
        }
    }
}

module.exports = ImgBBService;