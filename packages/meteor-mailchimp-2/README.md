# meteor-mailchimp-2
Use MailChimp API 2.0 via meteor

### this package is a placeholder for now

Once ready, you will be able to find it on [atmospherejs.com](https://atmospherejs.com/herrhelms)

### Foreword

This package is based on [miro:mailchimp](https://github.com/MiroHibler/meteor-mailchimp/tree/v0.4.2) but I needed some extras, so I repacked everything and concentrated on building a better sign-up form.
It is styled in a bootstrap manner even though just you don't need to add bootstrap to your project.

Hope this will help if you're in need for a fast direct list signup that works out of the box.
No validation emails are sent to subscribers. Their email address is added to the given listId right away.

Please feel free to add issues, fork, comment or extend...

### what's inside

A sign-up form that skips the default double_optin.<br>Insert it anywhere in your template with `{{> MailChimpListSubscribe}}`

### usage

add this package to your project with `meteor add herrhelms:meteor-mailchimp-2`

make sure you have a settings.json file in your projects server directory.

```json
{
    "private": {
        "MailChimp": {
            "apiKey": "YOURAPIKEY",
            "listId": "YOURLISTID"
        }
    }
}
```

start you meteor app with `meteor --settings server/settings.json`

If you have any questions regarding API Keys or ListIds from MailChimp please take a look at the [MailChimp Knowledge Base](http://kb.mailchimp.com) and the [API 2.0 Documentation](http://kb.mailchimp.com/api/).

PS: Keep in mind that soon the 2.0 API will be deprecated (end of 2015) since a 3.0 version is available (but missing necessary features for now)
