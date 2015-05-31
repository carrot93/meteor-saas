/*
* Routes: Public
* Routes that are visible to all (public) users.
*/

Router.route('index', {
  path: '/',
  template: 'index',
  onBeforeAction: function(){
      
    Session.set('currentRoute', 'index');
    this.next();
  }
});

Router.route('signup', {
  path: '/signup',
  template: 'signup',
  onBeforeAction: function(){
    Session.set('currentRoute', 'signup');
    Session.set('addingNewCreditCard', true);
    this.next();
  }
});

Router.route('login', {
  path: '/login',
  template: 'login',
  onBeforeAction: function(){
    Session.set('currentRoute', 'login');
    this.next();
  }
});

Router.route('restaurants', {
  path: '/restaurants',
  template: 'restaurants',
  onBeforeAction: function(){
    Session.set('currentRoute', 'restaurants');
    this.next();
  }
});


Router.route('restaurantDetails', {
  path: '/restaurant/:_id',
  template: 'restaurantDetails',
  subscriptions: function(){
    var subs = [
      Meteor.subscribe('restaurantDetails', this.params._id)
    ]
    return subs;
  },
  data: function(){
    return Restaurants.findOne({"_id": this.params._id});
  },
  onBeforeAction: function(){
    Session.set('currentRoute', 'restaurantDetails');
    this.next();
  }
});
    
Router.route('recover-password', {
  path: '/recover-password',
  template: 'recoverPassword',
  onBeforeAction: function(){
    Session.set('currentRoute', 'recover-password');
    this.next();
  }
});

Router.route('reset-password', {
  path: '/reset-password/:token',
  template: 'resetPassword',
  onBeforeAction: function() {
    Session.set('currentRoute', 'reset-password');
    Session.set('resetPasswordToken', this.params.token);
    this.next();
  }
});
