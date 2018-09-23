/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Locations from './Locations';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'locations.findOne': function locationsFindOne(locationId) {
    check(locationId, Match.OneOf(String, undefined));

    try {
      return Locations.findOne(locationId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'locations.insert': function locationsInsert(location) {
    check(location, {
      name: String,
      state: String,
    });

    try {
      return Locations.insert({ location });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'locations.update': function locationsUpdate(location) {
    check(location, {
      _id: String,
      name: String,
      state: String,
    });

    try {
      const locationId = location._id;
      const locationToUpdate = Locations.findOne(locationId);

      if (locationToUpdate) {
        Locations.update(locationId, { $set: location });
        return cityId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'locations.remove': function locationsRemove(locationId) {
    check(locationId, String);

    try {
      const locationToRemove = Locations.findOne(locationId);

      if (locationToRemove) {
        return Locations.remove(locationId);
      }
      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'locations.count': function locationsCount() {
    var count = Locations.find({}).count();
    console.log(count);
    return count;
  }
});


rateLimit({
  methods: [
    'locations.insert',
    'locations.update',
    'locations.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
