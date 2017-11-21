/*
 * DB script. Resets all items to default mode.
 */

import Item from '../models/item';
import configDB from '../../config/db';

// Config DB
configDB();

Item.find()
  .then(items => {
    items.forEach(item => {
      item.repetitions = 0;
      item.EF = 2.5;
      item.nextReviewDate = undefined;
      item.interval = undefined;
      item.reviewedAt = undefined;
      item.save();
    });
  })
  .catch(err => console.log('Oops!', err));
