import express from 'express';
import usersController from './users.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = express.Router();


// router.use(authenticateToken);

/**
 * Route to update the LLM of a user.
 * @route PUT /users/llm
 */
router.put('/api/users/llm', usersController.updateUserLLM);

/**
 * Route to update the language preference of a user.
 * @route PUT /users/language
 */
router.put('/api/users/language', usersController.updateUserLanguage);

/**
 * Route to update the theme preference of a user.
 * @route PUT /users/theme
 */
router.put('/api/users/theme', usersController.updateUserTheme);

export default router;
