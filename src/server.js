import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

import { CronJob } from 'cron';
import Emailer from './emails/emailer';
import setupRoutes from './routes';
import configDB from '../config/db';
import configPassport from '../config/passport';

import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

const app = express();
const port = process.env.PORT || 3000;

// Config DB
configDB();

// Config passport
configPassport(passport);

// Config express parsing capabilties
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.set('view engine', 'ejs');

// Setup passport
app.use(session({
	secret: 'battlewagon',
	resave: true,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Pulling routes for ./routes.js
setupRoutes(app, passport);

// Cron job that sends out early morning emails
const broadcastJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => { Emailer.broadcastEmails() },
	start: false,
	timeZone: 'America/New_York'
});

// App load function
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

	if (process.env.NODE_ENV === 'production') {
		broadcastJob.start();
	}
});
