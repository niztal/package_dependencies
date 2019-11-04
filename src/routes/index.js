import { Router } from 'express';
import retrieveDependencies from './retrieveDependencies';

const router = Router();

router.use('/dependencies', retrieveDependencies);

router.get('/', (req, res) => {
    res.send({message: 'Hello World!!'});
});

export default router;