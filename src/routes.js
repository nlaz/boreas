import mongoose from 'mongoose';
import passport from 'passport';
import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

export default function(app, passport) {
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage'),
		});
	});

	app.get('/signup', (req, res) => {
		res.render('signup.ejs', {
			message: req.flash('signupMessage'),
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/sessions/:sessionId', (req, res) => {
		const sessionId = req.params.sessionId;
		ReviewSessionEntity.findById(sessionId, (err, session) => {
			if (err) { return console.log(err); }

			ItemEntity.find( { _id: { $in: session.items }}, (err, items) => {
				if (err) { return console.log(err); }

				console.log(items);
				res.send(items);
			});
		});
	});

	app.get('/api/items', (req, res) => {
		ItemEntity.find({}, (err, items) => {
			if (err) { return console.log(err); }
			res.send(items);
		});
	});

	app.get('/api/items/:itemId', (req, res) => {
		ItemEntity.findById(req.params.itemId, (err, item) => {
			if (err) { console.log(err); }
			return res.send(item);
		});
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/');
	}
}