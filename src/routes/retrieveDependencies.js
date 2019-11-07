import { Router } from 'express';
import axios from 'axios';
import cache from '../services/cacheService'
import "babel-polyfill";

const router = Router();

const npmURL = "https://registry.npmjs.org"; //TODO: move to config file

router.get('/', async (req, res, next) => {
    try {
        const {package:pkg, version} = req.query;
        if (!pkg) {
            throw {response: {
                status: 400,
                data: "no package given"
            }};
        }

        const dependenciesKey = `${pkg}_${version ? version : 'latest'}`;

        const cachedDependencies = cache.retrieve(dependenciesKey);
        if (cachedDependencies) {
            res.status(200).send(cachedDependencies);
            return;
        }

        const {data} = await axios.get(`${npmURL}/${pkg}/${version ? version : 'latest'}`);
        const dependencies = {
            dependencies: data.dependencies,
            devDependencies: data.devDependencies
        }

        cache.insert(dependenciesKey, dependencies)
        
        res.status(200).send(dependencies);
    } catch(err) {
        next(err);
    }
});

export default router;
