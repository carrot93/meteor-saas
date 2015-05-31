/*
// http://stackoverflow.com/questions/11392566/mongo-geospatial-index-and-meteor
// https://atmospherejs.com/mdg/geolocation
// http://stackoverflow.com/questions/16635955/mongo-geolocation-using-near-and-2d-index-not-being-accurate
        //https://github.com/pmwisdom/mirrorcell-geolocation-plus
         // http://stackoverflow.com/questions/20016269/what-is-difference-between-geojson-legacy-coordinate-pairs-in-terms-of-mongodb 
        //http://askmike.org/2013/01/how-to-use-geospatial-indexing-in-mongo-using-nodejs-and-mongoose/
        //http://emptysqua.re/blog/paging-geo-mongodb/


    var self = this;
    var handle = Restaurants.aggregate(
        {
            $geoNear: {
                near: {type: 'Point', coordinates: [-73.9867714, 40.7594681]},
                distanceField: 'distance',
                maxDistance: 10000,
                spherical: true,
                sort: -1
            }
        }
    );
    
    _.each(handle,function(response) {
        console.log(response);
        self.added('Restaurants', Random.id(), response);
    });
    

    self.ready();
*/

Meteor.publish('restaurantList', function(limit,geoLocationLimit){
    check(limit,Number);
    check(geoLocationLimit,Object);
    var self = this;
    
    if (!limit) var limit = 20;
    Restaurants._ensureIndex({ 'location' : "2dsphere" });
    
    getList  = Restaurants.find(geoLocationLimit,{limit: limit});
    
    if (getList){
        return getList;
    }

    
});


// viewInvoice
Meteor.publish('restaurantDetails', function(id){
  // Publish only the invoice for the ID passed in our argument. We also make sure
  // to check our argument for validity.
  check(id, String);

    getInvoice = Restaurants.find({"_id": id});

  if (getInvoice){
    return getInvoice;
  }
});
