import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/authMiddleware.js';


const app = express();

try {
    const uri = 'mongodb://localhost:27017/techStore';
    await mongoose.connect(uri);
    console.log('DB Connected');
} catch (error) {
    console.error('Error connecting to DB: ', error);
}

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});