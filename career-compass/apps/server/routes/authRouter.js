import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/logout', logout);
router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);

export default router;
