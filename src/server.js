import express from 'express';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';
import routes from './routes';

const app = express();

app.use('/', routes);
app.use(errorHandlingMiddleware);

app.listen(5000, () => {console.log("server is up at port: " + 5000);});

//Exporting application for testing purposes
export default app;