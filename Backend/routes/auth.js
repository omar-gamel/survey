import express from 'express';
import authController from '../controllers/auth';
import jwtAuth from '../services/passport';
const upload = require('../services/multer-service');

const router = express.Router();

router.post('/login', authController.login);

router.get('/current', jwtAuth.authenticate(), authController.getUser);

router.put('/AnsweredSuject', jwtAuth.authenticate(), authController.AnsweredSuject);

router.post('/change-password', jwtAuth.authenticate(), authController.changePassword);

router.post('/create', upload.single('avatar'), authController.create );

router.get('/:userId', authController.getAdminUser);

router.get('/', authController.getAll);

router.put('/:userId', upload.single('avatar'), authController.update);

router.delete('/:userId', authController.delete);

export default router;
