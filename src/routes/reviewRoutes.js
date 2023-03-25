import express from 'express'
const reviewRouter = express.Router();
import { addReview } from '../controllers/review_controllers';
import { verifyToken } from '../helpers/authHelpers.js';

reviewRouter.post('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyToken, addReview);

export { reviewRouter }