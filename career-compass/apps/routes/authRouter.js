import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { checkUserSession } from '../middleware/authMiddleware.js';
validateRegisterInput;

const router = Router();

router
  .route('/register')
  .get(checkUserSession)
  .post(validateRegisterInput, register);
router.route('/login').get(checkUserSession).post(validateLoginInput, login);
router.get('/logout', logout);

export default router;
