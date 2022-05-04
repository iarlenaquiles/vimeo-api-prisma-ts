import express from 'express';
import 'dotenv/config';
const app = express();
import routes from './routes/index.routes';

app.use(express.json());        
app.use(routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
