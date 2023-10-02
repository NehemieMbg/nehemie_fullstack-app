import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    message: 'Too many requests from this IP, please try again in an hour!',
  },
});

const router = Router();

router.route('/register').post(apiLimiter, validateRegisterInput, register);
router.route('/login').post(apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
