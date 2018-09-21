import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Locations from '../Locations';

Meteor.publish('locations.all', function locationsAll() {
  return Locations.find({});
});
