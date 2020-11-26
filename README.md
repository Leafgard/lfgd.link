
<h1 align="center">
  <br>
  <a href="http://lfgd.link"><img src="https://media.giphy.com/media/JMjqi43CxeGhOnMVsK/giphy.gif" alt="Markdownify" width="500"></a>
  <br>
</h1>

<h4 align="center">A blazing-fast, ad-free URL shortener.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#download">Local Usage</a> •
  <a href="#built-with">Built With</a>
</p>

## Key Features

* Ad-free
* No inscription required
* Either use a custom slug between 6 and 16 characters or it will be randomly generated

## Local Usage

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Leafgard/lfgd.link

# Go into the repository
$ cd lfgd.link

# Go into the packages/ client - server folders, install dependencies and build
$ yarn
$ yarn build

# Create .env copy from .env.example with your custom credentials into server folder

# Finally, run server directly using
$ yarn start

# or use Docker
$ docker-compose up -d
```

## Built With

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [React](http://reactjs.org/)
- [MongoDB](https://www.mongodb.com/fr)
- [Koa](https://koajs.com/)
