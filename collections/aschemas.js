Schemas = {};


GeocoordsSchema = new SimpleSchema({
  lng: {
    type : Number,
    decimal: true,
    min: -180,
    max: 180
  }, 
  lat: {
    type : Number,
    decimal: true,
    min: -90,
    max: 90
  }
});


LocationSchema = new SimpleSchema({
  type : {
    type : String,
    autoValue: function() {
      return "Point";
    }
  },
  coordinates: {
    type: [Number],
    decimal: true
  }
});



Schemas.Restaurant = new SimpleSchema({
  _id: {
    type: String,
    label: "unique id",
    optional: true,
    max: 200
  },
  urbanUrl: {
    type: String,
    label: "Urbanscape URL",
    optional: true,
    max: 200
  },
  urbanImg: {
    type: String,
    label: "Urbanscape JPG",
    optional: true
  },
  name: {
    type: String,
    label: "Restaurant name",
    optional: true
  },
  phone: {
    type: String,
    label: "Telephone number",
    optional: true
  },
  city: {
    type: String,
    label: "City",
    optional: true
  },area: {
    type: String,
    label: "Area",
    optional: true,
    max: 200
  },
  address: {
    type: String,
    label: "Address",
    optional: true
  },
  county: {
    type: String,
    label: "County",
    optional: true
  },
  state: {
    type: String,
    label: "State",
    optional: true
  },
  zipcode: {
    type: Number,
    label: "Zip code",
    optional: true
  },
webpage: {
    type: String,
    label: "Website",
    optional: true,
    max: 200
  },
  facebook: {
    type: String,
    label: "Facebook",
    optional: true
  },
  twitter: {
    type: String,
    label: "Twitter",
    optional: true
  },
  priceRange: {
    type: Number,
    label: "Price range 1-4",
    optional: true
  },
  rating: {
    type: Number,
    label: "Rating",
    optional: true
  },
    votes: {
    type: Number,
    label: "Votes",
    optional: true
  },
    reviews: {
    type: Number,
    label: "Reviews",
    optional: true
  },
    
    googleMaps: {
    type: String,
    label: "Google Maps URl",
    optional: true
  },
    latitude: {
    type: String,
    label: "latitude",
    optional: true
  },
    longitude: {
    type: String,
    label: "longitude",
    optional: true
  },
    location: {
    type: LocationSchema
  }
 
});
//https://maps.googleapis.com/maps/api/staticmap?sensor=false&size=145x145&markers=color:blue%7C,&zoom=13&key=AIzaSyCuqaK0OkJHdSbVmd1Ry-PUefXYRmL-NzA

