const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid'); // UUID for unique image names
require('dotenv').config();
const CustomeError = require('../../utils/errors/customError');
const { logger } = require('../../utils/logger');

class ImgBBService {
    static baseURL = 'https://api.imgbb.com/1/upload';
    static apiKey = process.env.IMGBB_API_KEY;

    static async uploadImage(imageBuffer, album = 'users') { // Default album is users
        if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
            throw new CustomeError('Invalid image buffer provided', 400);
        }
        logger.info('Uploading image to ImgBB', { album });
        const formData = new FormData();
        formData.append('image', imageBuffer.toString('base64'));

        // Prefix image name with album
        const imageName = `${album}/image-${uuidv4()}`;

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
            console.error('Error uploading to ImgBB:', error.message, { album });
            throw new CustomeError(
                error.response?.data?.error?.message || 'Error uploading image',
                400
            );
        }
    }
}

module.exports = ImgBBService;
