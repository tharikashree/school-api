import express from 'express';
import cors from 'cors';
import addSchool from './api/addSchool.js';
import listSchools from './api/listSchools.js';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
    res.send('School API is running');
});
app.post('/api/addSchool', addSchool);
app.get('/api/listSchools', listSchools);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
