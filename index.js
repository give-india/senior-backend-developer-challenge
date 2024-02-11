import express from 'express';
import helmet from "helmet"; // Cross-Site-Scripting(XSS), clickjacking
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(helmet());
const port = process.env.PORT || 5000;
import router from './src/routes/index.js';
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
app.use('/api', router);

/* app.use((err, req, res, next) => {
    res.status(500).json({
        message: err
    });
}); */

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = '400';
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 400;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
export default app;