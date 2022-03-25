# unleash-frontend

## Run with a local instance of the unleash-api:

You need to first start the unleash-api on port 4242
before you can start working on unleash-frontend.
Start webpack-dev-server with hot-reload:

```bash
cd ~/unleash-frontend
yarn install
yarn run start
```

## Run with a heroku-hosted unleash-api:

```bash
cd ~/unleash-frontend
yarn install
yarn run start:heroku
```

## UI Framework

We are using [material-ui](http://material-ui.com/).

## End to End Tests

We have a set of Cypress tests that run on the build before a PR can be merged so it's important that you check these yourself before submitting a PR.

On the server the tests will run against the deployed Heroku app so this is what you probably want to test against:

```bash
yarn run start:heroku
```

In a different shell, you can run the tests themselves:

```bash
yarn e2e:heroku
```

If you need to test against patches against a local server instance, you'll need to run that, navigate to the UI and create a user with the following details:

* email: test@test.com
* password: qY70$NDcJNXA

And then run the end to end tests using:

```bash
yarn e2e
```

You may also need to test that a feature works against the enterprise version of unleash. Assuming the Heroku instance is still running, this can be done by:

```bash
yarn e2e:enterprise:heroku
```

Note that we've used some waits in some of the end to end tests and this can cause issues running againsts the Heroku instance if you have a poor connection to the hosted server. The wait timeout is defined as a variable in cypress/integration/feature-toggle/feature.spec.js and can be modified locally for your needs.


Happy coding!
