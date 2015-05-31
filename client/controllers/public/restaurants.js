var ITEMS_INCREMENT = 20;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);


Deps.autorun(function() {
    
    myLocation = Geolocation.currentLocation();
    
    if (myLocation){ 
        geoLocationLimit = {location :{ $near :{$geometry : {type : "Point" ,coordinates : [myLocation.coords.longitude, myLocation.coords.latitude] }}}};
    } 
    else { 
        geoLocationLimit = {}; 
    }

    Session.setDefault('geoLocationLimit', geoLocationLimit);
    
    Meteor.subscribe('restaurantList', Session.get('itemsLimit'),geoLocationLimit);
});

Template.restaurants.helpers({
    lists: function(){
        /// add if we have a location.
        //, sort: {rating: -1}
        return Restaurants.find(Session.get('geoLocationLimit'));
    },
    moreResults: function() {
        // If, once the subscription is ready, we have less rows than we
        // asked for, we've got all the rows in the collection.
        return !(Restaurants.find().count() < Session.get("itemsLimit"));
    },
    myLocation: function(){
        //
        // Session.set('geolocation', myLocation);
    }
});





// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");
    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("itemsLimit",
                        Session.get("itemsLimit") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }        
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);
