import sg, { mail as helper } from 'sendgrid';
import Email from '../models/email';
import User from '../models/user';

import * as ItemController from './items';
import { REVIEW_SESSION_SIZE } from './sessions';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const domain = process.env.HOST_URL;
const sourceEmail = new helper.Email('boreas@test.com');
const subjects = [
	'Start your morning with some knowledge - Boreas',
	'Well, Check This Out - Boreas',
	'Some fresh baked notes for you to review - Boreas',
	'Hey Good Looking - Boreas',
	'>>>>CLICK HERE<<<<< (Or Don\'t) - Boreas'
];

const template = (name, items) => {
	const url = `${domain}/sessions/new`;
	const buttonStyle = 'background-color:#2e78ba;border-radius:3px;color:#ffffff;line-height:30px;height:30px;text-align:center;text-decoration:none;width:100px;';

	return (
	`<div style='color:#000000;'>
		<p>You have ${items.length} items that need review. Review them now before you forget.</p>
		<br/>

		<div style='${buttonStyle}'>
			<a href='${url}' style='color:#ffffff;text-decoration:none;'>Review Now</a>
		</div>

		<p>Anyways that was fun. See you later!</p>

		<p>Your friend,</p>
		<p>Boreas</p>
	</div>`
	);
};

const constructEmailRequest = (targetName, targetEmail, items	) => {
	const subject = subjects[Math.floor(Math.random() * subjects.length)];
	const content = new helper.Content('text/html', template(targetName, items, sessionId));
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	return sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
};

export const broadcastEmailToUser = user => {
	ItemController.getDueItemsHelper(user.id)
		.then(items => {
			if (items.length >= REVIEW_SESSION_SIZE ) {
				// Only send email if items less than review size.
				sendEmail(user, items);
			}
		})
		.catch( error => {
			console.log(error);
		});
};

export const broadcastEmailsToAll = () => {
	User.find({ is_email_on: true })
		.then( users => {
			users.forEach( user => {
				broadcastEmailToUser(user);
			});
		})
		.catch( error => {
			return console.log(error);
		});
};

export const sendEmail = (user, items) => {
	console.log(`Attempting email to ${user.email}...`);
	const request = constructEmailRequest(user.name, user.email, items);

	return sendgrid.API(request)
		.then(response => {
			console.log('Email Success - Status Code:', response.statusCode);
		})
		.catch(error => {
			console.log('Emailer Error', error.response.statusCode, error.response);
		});
};
