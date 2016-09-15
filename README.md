# Openshift Express Vhoster
Shell project for hosting multiple Express.js applications on 1 OpenShift gear.  

### Installation

Install [Node.js](https://nodejs.org/) if necessary.

Install the dependencies and devDependencies and start the server.

```
> git clone https://github.com/fgurtler/openshift-express-vhoster
> cd openshift-express-vhoster
> npm install -d
> npm run dev
```
### Adding Websites
```
> cd openshift-express-vhoster
> mkdir new-website.com
> cd new-website.com
> express
```
Edit app.js:
```js
app.vhosts = [
  /* update hosts file to point the names below to 127.0.0.1 */
  'localhost',
  'new-website.com'  
];
```
Then run the server and navigate to your domain.

### Tech Stack

* [node.js] - evented I/O for the backend
* [Express] - node.js web app framework

### Todos

 - Write "Getting Started" guide
   - configuring OpenShift
   - using Git submodules for each website


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>

