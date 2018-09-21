/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

class City
{
    constructor(doc) {
        _.extend(this, doc);
    }

    getState() {
        return States.findOne({ _id: this.state });
    }

    apiFormatted() {
        const city = {
            ...this,
            lng: this.loc.coordinates[0],
            lat: this.loc.coordinates[1]
        };

        delete city.log;
        delete city.loc;
        delete city.tour_count;
        delete city.tour_point_count;
        delete city.user_count;

        return city;
    }
    kill() {
        if (Meteor.isClient)
        {
            Meteor.call('deleteCity', this._id);
        }
    }

}

const Cities = new Mongo.Collection('cities', { transform:(doc)=> new City(doc)});
if (Meteor.isServer) { Cities._ensureIndex({loc:'2dsphere'})}

Cities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Cities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Cities.schema = new SimpleSchema({

    name: String,

    state: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },

    loc: Object,
    'loc.type': String,
    'loc.coordinates': [Number],

    tour_count: Number,
    tour_point_count: Number,
    user_count: Number
});

Cities.attachSchema(Cities.schema);

export default Cities;
