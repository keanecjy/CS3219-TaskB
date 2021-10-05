import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/movies', router);

export default app;
