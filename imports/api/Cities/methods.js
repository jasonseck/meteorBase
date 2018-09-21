/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Cities from './City';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'cities.findOne': function citiesFindOne(cityId) {
    check(cityId, Match.OneOf(String, undefined));

    try {
      return Cities.findOne(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'cities.insert': function citiesInsert(doc) {
    check(doc, {
      name: String,
      state: String,
    });

    try {
      return Cities.insert({ doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'cities.update': function citiesUpdate(doc) {
    check(doc, {
      _id: String,
      name: String,
      state: String,
    });

    try {
      const cityId = doc._id;
      const cityToUpdate = Cities.findOne(cityId);

      if (cityToUpdate) {
        Cities.update(documentId, { $set: doc });
        return cityId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'cities.remove': function citiesRemove(cityId) {
    check(cityId, String);

    try {
      const cityToRemove = Cities.findOne(cityId);

      if (cityToRemove) {
        return Cities.remove(cityId);
      }
      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'documents.insert',
    'documents.update',
    'documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
