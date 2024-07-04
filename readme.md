### How to run

In main folder

```
docker-compose -f docker-compose.prod.yml up --build
```

In `client` folder

```
npm run build-and-run
```

### How to run a dev version

In root folder

```
npm install
```

```
docker-compose -f docker-compose.dev.yml up --build
```

In `server` folder:

```
npm run watch
```

In `client` folder

```
npm run watch-webpack
```

```
npm run watch-electron
```
