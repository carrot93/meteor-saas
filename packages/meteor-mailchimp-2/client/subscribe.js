var subscribeMessage = 'Subscribe now to keep updated';
var subscribeLooksGoodMessage = 'This email address looks great! Press enter key or tab the button';
var subscribeInvalidEmail = 'Enter a valid email address.';
var subscribeSubscribing = 'Adding your email to the subscription list.';
var subscribeSuccess = 'You have successfully subscribed. We\'ll send a welcome mail';
var subscribeAlreadySubscribed = 'This email is already on the list. Good for you!';

var subscribeTitle;
var subscribeEmail;
var subscribeButton;

var showMessage = function(message) {
    if (subscribeTitle) {
        subscribeTitle.innerHTML = message;
    }
};

Session.setDefault('MCicon', 'record');


var isValidEmailAddress = function(emailAddress) {
    // http://stackoverflow.com/a/46181/11236
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
};

var validateEmailAddress = function(updateMessage) {
    if (subscribeEmail.value !== '' && isValidEmailAddress(subscribeEmail.value)) {
        subscribeButton.disabled = false;
        Session.set('MCicon', 'ok-circle');
        if (updateMessage) {
            showMessage(subscribeLooksGoodMessage);
        }
    } else {
        subscribeButton.disabled = true;
        if (subscribeEmail.value !== '') {
            Session.set('MCicon', 'remove-circle');
            showMessage(subscribeInvalidEmail);
        } else if (updateMessage) {
            Session.set('MCicon', 'record');
            showMessage(subscribeMessage);
        }
    }
};

var mailChimpListSubscribe = function(email, list_id) {
    var mailChimp = new MailChimp(/* apiKey, options */);
    console.log('mailChimp found');
    mailChimp.call('lists', 'subscribe',
        {
            id: list_id,        // null -> defined @ server
            email: {
                email: email
            },
            merge_vars: {
                double_optin: false
            },
            double_optin: false,
            send_welcome: true
        },

        function(error, result) {
            if (error) {
                switch (error.error) {
                    case 232:    // 'Email_NotExists'
                        showMessage(subscribeInvalidEmail);
                        break;
                    case 214:    // 'List_AlreadySubscribed'
                        showMessage(subscribeAlreadySubscribed);
                        subscribeEmail.value = '';
                        break;
                    default:
                        showMessage('Error: ' + error.reason);
                }

                console.error('[MailChimp][Subscribe] Error: %o', error);
            } else {
                showMessage(subscribeSuccess);
            }
            subscribeEmail.disabled = false;
            validateEmailAddress(false);
        }
   );
};

var subscribeGo = function(eventBubbling) {
    subscribeEmail.disabled = true;
    subscribeButton.disabled = true;
    showMessage(subscribeSubscribing);
    mailChimpListSubscribe(subscribeEmail.value);
    return eventBubbling;
};

Template.MailChimpListSubscribe.rendered = function() {
    subscribeTitle = this.find('#mc-message');
    subscribeEmail = this.find('#mc-email');
    subscribeButton = this.find('#mc-button');
    subscribeButton.disabled = (subscribeEmail.value === '');
};

Template.MailChimpListSubscribe.helpers({
    message: function() {
        subscribeMessage = this.title || subscribeMessage;
        return subscribeMessage;
    },
    indicator: function() {
        return Session.get('MCicon');
    }
});

Template.MailChimpListSubscribe.events({
    'focus .email, paste .email, cut .email': function(e) {
        setTimeout(function(e) {
            validateEmailAddress(true);
        }, 0);
    },
    'keyup .email': function(e) {
        var key = e.which || e.keyCode || e.charCode;
        if (key === 8 || key === 46) {
            setTimeout(function() {
                validateEmailAddress(true);
            }, 0);
        }
    },
    'submit form': function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    },
    'blur .email': function(e) {
        if (subscribeEmail.value === '') {
            Session.set('MCicon', 'record');
            showMessage(subscribeMessage);
        }
    },
    'keypress .email': function(e) {
        var key = e.which || e.keyCode || e.charCode;
        setTimeout(function() {
            validateEmailAddress(true);
            if (isValidEmailAddress(subscribeEmail.value)) {
                if (key === 13) {        // [Return]
                    subscribeGo(false);
                }
            }
        }, 0);
    },
    'click .subscribe': function(e) {
        validateEmailAddress(true);
        if (isValidEmailAddress(subscribeEmail.value)) {
            subscribeGo(false);
        }
    }
});
