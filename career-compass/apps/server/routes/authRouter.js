import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { checkUserSession } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/logout', logout);
router
  .route('/register')
  .get(checkUserSession)
  .post(validateRegisterInput, register);
router.route('/login').get(checkUserSession).post(validateLoginInput, login);

export default router;
