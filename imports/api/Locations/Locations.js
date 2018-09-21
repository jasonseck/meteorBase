/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

export const LocationType = [
    {type: "PUBLIC_LOCATION", value:1},
];

export const OwnerStatus = [
  {type: "NO_OWNER", value:0},
  {type: "CLAIMED", value:1},
  {type: "APPROVED", value:2}
];

class Location {
    constructor(doc) {
        _.extend(this, doc);
    }

    getState() {
        return States.findOne({ _id: this.state });
    }

    getCity() {
        return Cities.findOne({ _id: this.city });
    }

    getEntity() {
      return Entities.findOne({_id:this.entityOwner});
    }

    getOwner() {
        if (!this.entityOwner)
        {
            return null;
        }
        return this.entityOwner;
    }


    kill() {
        if (Meteor.isClient) {
            Meteor.call('deleteLocation', {
                _id: this._id
            });
        }
    }

    apiFormatted() {
      const location = {
          ...this,
          lng: this.loc.coordinates[0],
          lat: this.loc.coordinates[1]
      };

      delete location.loc;
      delete location.associatedTourPoints;
      delete location.userCount;

      return location;
    }
}

const Locations = new Mongo.Collection('locations', { transform:(doc)=> new Location(doc)});
if (Meteor.isServer) { Locations._ensureIndex({loc:'2dsphere'})}

Locations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Locations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Locations.schema = new SimpleSchema({

  name: {
      type: String,
      min: 1,
      max: 150,
      label:"name"
  },
  name_sort: {
    type:String,
    optional:true,
    autoValue: function() {
      var name= this.field("name");
      if(name.isSet) {
        return name.value.toLowerCase();
      } else {
        this.unset();
      }
    }
  },

  entityOwner: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true
  },
  ownerStatus: {
    type: Number,
    optional: true

  },


  image: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true
  },

  address: {
      type: String,
      max: 150
  },

  city: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
  },

  state: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
  },

  zipCode: {
      type: String,
      regEx: SimpleSchema.RegEx.ZipCode
  },

  completeAddress: {
      type: String,
      max: 175
  },

  phone: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Phone
  },

  shortDescription: {
    type: String,
    max: 500,
    optional: true
  },
  longDescription: {
    type: String,
    max:2500,
    optional: true
  },
  duration: {
    type: String,
    max: 50,
    optional: true
  },
  interestMarkers: {
    type: Array,
    optional: true
  },
  "interestMarkers.$": {
      type: String,
      regEx: SimpleSchema.RegEx.Id
  },


  hours:{
    type: Object,
    optional: true
  },
  'hours.monday' : Object,
  'hours.monday.open' : Boolean,
  'hours.monday.opentime' : SimpleSchema.Integer,
  'hours.monday.closetime' : SimpleSchema.Integer,
  'hours.tuesday' : Object,
  'hours.tuesday.open' : Boolean,
  'hours.tuesday.opentime' : SimpleSchema.Integer,
  'hours.tuesday.closetime' : SimpleSchema.Integer,
  'hours.wednesday' : Object,
  'hours.wednesday.open' : Boolean,
  'hours.wednesday.opentime' : SimpleSchema.Integer,
  'hours.wednesday.closetime' : SimpleSchema.Integer,
  'hours.thursday' : Object,
  'hours.thursday.open' : Boolean,
  'hours.thursday.opentime' : SimpleSchema.Integer,
  'hours.thursday.closetime' : SimpleSchema.Integer,
  'hours.friday' : Object,
  'hours.friday.open' : Boolean,
  'hours.friday.opentime' : SimpleSchema.Integer,
  'hours.friday.closetime' : SimpleSchema.Integer,
  'hours.saturday' : Object,
  'hours.saturday.open' : Boolean,
  'hours.saturday.opentime' : SimpleSchema.Integer,
  'hours.saturday.closetime' : SimpleSchema.Integer,
  'hours.sunday' : Object,
  'hours.sunday.open' : Boolean,
  'hours.sunday.opentime' : SimpleSchema.Integer,
  'hours.sunday.closetime' : SimpleSchema.Integer,

  price_range: {
    type: Number,
    min:1,
    max:4,
    optional: true
  },

  loc: {type: Object, optional:true},
  'loc.type': String,
  'loc.coordinates': [Number],

  associatedTourPoints: {
      type: Number
  },
  associatedKeys: {
      type: Number,
      optional: true,
  },

  userCount: {
      type: Number
  },
  locationEmail : {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true,
  },
  locationWebsite: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  categories: {
    type: Array,
    optional: true
  },
  "categories.$": {
    type: String,
    optional: true
  },
  metafields: {
    type: Array,
    optional: true
  },
  'metafields.$':Object,
  'metafields.$.fieldName':String,
  'metafields.$.fieldData':String,



});

Locations.attachSchema(Locations.schema);

export default Locations;
