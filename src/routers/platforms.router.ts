import express from 'express';
import * as platformController from '../controllers/platforms.controller.js';

const router = express.Router();

router.post('/platform', platformController.insertPlatform);
router.get('/platforms', platformController.listPlatforms);

export default router;