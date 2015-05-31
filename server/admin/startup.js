/*
* Startup
* Collection of methods and functions to run on server startup.
*/

/*
* Generate Server Authentication Token
* Create a token on startup to identify the server when calling methods. This
* allows the server to call certain methods, but not the client (e.g. if a user)
* discovers the name of a method that's "destructive," we can prevent any bad
* actions by checking against this token (which they cannot see). Note, we use
* the random package to generate our token so that it's even less discoverable.
*/

// Here, we're calling on Random's secret method which creates a 43 character
// string with 256 bits of entropy. Per the Meteor docs: "Use Random.secret for
// security-critical secrets that are intended for machine, rather than human,
// consumption." This is what we want because only our method(s) will check this
// value, not us (humans).
SERVER_AUTH_TOKEN = Random.secret();


//added by dan
Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins); 

/*
* Generate Test Accounts
* Creates a collection of test accounts automatically on startup.
*/

// Create an array of user accounts.
var users = [
    // Note: our demo user here is purely for mock purposes and does not correspond
    // to a real customer on Stripe.
    {
        name: "Andy Warhol",
        email: "andy@warhol.com",
        password: "your15minutesisup",
        subscription: {
            plan: {
                name: "small",
                used: 1
            },
            payment: {
                card: {
                    type: "Visa",
                    lastFour: "1234"
                },
                nextPaymentDue: ( new Date() ).getTime()
            }
        },
        customerId: "13951jfoijf13oij"
    }
]

// Loop through array of user accounts.
for(i=0; i < users.length; i++){
    // Check if the user already exists in the DB.
    var user      = users[i],
        userEmail = user.email,
        checkUser = Meteor.users.findOne({"emails.address": userEmail});

    // If an existing user is not found, create the account.
    if( !checkUser ){
        // Create the new user.
        var userId = Accounts.createUser({
            email: userEmail,
            password: user.password,
            profile: {
                name: user.name
            }
        });

        if (userId){
            Meteor.users.update(userId,{
                $set: {
                    subscription: user.subscription,
                    customerId: user.customerId
                }
            }, function(error, response){
                if (error) {
                    console.log(error);
                } else {
                    // Once the user is available, give them a set of todo lists equal to their
                    // plan limit. Wrap this in a setTimeout to give our collection a chance to
                    // be initialized on the server.
                    for(i=0; i < user.subscription.plan.used; i++){
                        Meteor.call('insertTodoList', userId, function(error){
                            if (error) {
                                console.log(error);
                            }
                        });
                    }
                }
            });
        }
    }
}

//Dans-MacBook-Air:meteor-saas danvoinea$ meteor mongo --url dineout.meteor.com


// mongoimport -h production-db-c2.meteor.io:27017 -u client-48254da3 -p 6d1510e4-c6fe-34f9-b83c-4f0fa5fd1727 --db dineout_meteor_com --collection restaurants --type csv --file nyc-test.csv --headerline;

//// https://adilapapaya.wordpress.com/2014/03/12/things-i-wish-someone-told-me-when-i-first-started-learning-meteor-js/

Meteor.startup(function() {


    
    if (Restaurants.find().count() === 0) {


        //var fs = Npm.require('fs');
        var file='/Users/danvoinea/Development/meteor-saas/public/nyc-test.csv';
        //var filenyc='/Users/danvoinea/Development/meteor-saas/public/nyc.csv';
        //var filemiami='/Users/danvoinea/Development/meteor-saas/public/miami.csv';
        
        //var contents = fs.readFileSync(file).toString(); 
        var contents = Meteor.http.get('http://dev.dineout.io/nyc-test.csv', {timeout:30000}).content;
        // var contents = fs.readFileSync(filenyc).toString()+fs.readFileSync(filemiami).toString(); 
        parsed = Baby.parse(contents,{'dynamicTyping': true, 'header': true});

        for(var i = 0; i < parsed.data.length; i++) {
            var obj = parsed.data[i];
            if (obj.name){
                //obj.location = {'type':'Point', 'coordinates': [lng:,lat:] } ;
                obj.location={"type": "Point", "coordinates": [obj.longitude, obj.latitude]}
                Restaurants.insert(obj);
                
            }
        }



    }
});

