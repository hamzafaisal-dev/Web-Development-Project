import express from 'express'
const reviewRouter = express.Router();
import { addReview, getReviews, updateReview, deleteReview, deleteAllReviews } from '../controllers/review_controllers.js';
import { verifyAccessToken } from '../helpers/authHelpers.js';

reviewRouter.post('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyAccessToken, addReview);

reviewRouter.get('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyAccessToken, getReviews);

reviewRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID', verifyAccessToken, updateReview);

reviewRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID', verifyAccessToken, deleteReview);

reviewRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyAccessToken, deleteAllReviews);

export { reviewRouter }