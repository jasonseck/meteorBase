import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Cities from '../City';

Meteor.publish('cities.all', function cities() {
  return Cities.find({});
});
