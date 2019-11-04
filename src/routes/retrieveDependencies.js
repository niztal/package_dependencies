import { Router } from 'express';
import axios from 'axios';
import "babel-polyfill";

const router = Router();

const npmURL = "https://registry.npmjs.org"; //TODO: move to config file

router.get('/', async (req, res, next) => {
    try {
        const {package:pkg, version} = req.query;
        const {dependencies, devDependencies} = await axios.get(`${npmURL}/${pkg}/${version ? version : 'latest'}`);

        res.status(200).send({dependencies, devDependencies});
    } catch(err) {
        next(err);
    }
});

export default router;
