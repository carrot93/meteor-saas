Restaurants = new Meteor.Collection('restaurants',{idGeneration: 'STRING'});

Restaurants.attachSchema(Schemas.Restaurant);

/*
* Allow
*/

Restaurants.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});

/*
* Deny
*/

Restaurants.deny({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
