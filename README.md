# Blog Frontend with Next.js By MasterAddy

- To know about Next.js Check [Learn Next Site](https://nextjs.org/learn)

- Goto `lib/config.js` and change the link under it to your own backend blog link which serves you api.

- Also goto `pages/_app.js` and change the brandname under state also the social username too.

- Finally in order for Next.js to be deployed we could either have a `next.config.js` or a `package.json`, for this example we are just going to create a `next.config.js` with the following code:

```js
module.exports = {
  target: "serverless",
};
```

### Deploy with Now

First we need to create a `now.json` configuration file to instruct Now how to build the project.

For this example we will be using our newest version [Now 2.0](https://zeit.co/now).

By adding the `version` key to the `now.json` file, we can specify which Now Platform version to use.

We also need to define each builders we would like to use. [Builders](https://zeit.co/docs/v2/deployments/builders/overview/) are modules that take a deployment's source and return an output, consisting of [either static files or dynamic Lambdas](https://zeit.co/docs/v2/deployments/builds/#sources-and-outputs).

In this case we are going to use `@now/next` to build and deploy our Next.js application selecting the `next.config.js` as our entry point. We will also define a name for our project (optional).

```json
{
  "version": 2,
  "name": "nextjs",
  "builds": [{ "src": "next.config.js", "use": "@now/next" }]
}
```

Visit our [documentation](https://zeit.co/docs/v2/deployments/configuration) for more information on the `now.json` configuration file.

We are now ready to deploy the app.

```
now
```
