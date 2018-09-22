import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Locations from '../Locations';

Meteor.publish('locations.all', params => {
  console.log(params);
  check(params, {
    limit: Number,
    skip:Number
  });
  return Locations.find({},{
                            sort:{name:1},
                            limit:params.limit,
                            skip:params.skip
  });
});
