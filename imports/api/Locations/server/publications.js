import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Locations from '../Locations';

Meteor.publish('locations.all', params => {
  console.log(params);
  check(params, {
    limit: Number,
    skip:Number,
    name:String,
  });
  var regex = new RegExp(params.name,"i");
  return Locations.find({
                          "name" : regex
                        },{
                            skip:params.skip,
                            limit:params.limit,
                            sort:{name:1}
  });
});
