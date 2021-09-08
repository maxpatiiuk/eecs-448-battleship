# Documentation

This is a general documentation for EECS 448 Battleship game.

This guide contains information on getting the development and production server
up, as well as information about tools used in the process of development and
works cited.

## Time Estimate

[Time estimate](time-estimate.md) and
[actual accounting of time taken](time-accounting.md)

## Development

Clone this repository

```zsh
git clone https://github.com/maxxxxxdlp/eecs-448-battleship
```

This project uses pre-commit.com hooks, which run code linters and validators
before every commit. Instructions for configuring pre-commit hooks can be found
in [.pre-commit-config.yaml](../.pre-commit-config.yaml)

Then run these commands:

```zsh
npm i       # install dependencies
npm run dev # start development server
```

This would start the development server at
[http://locahlost:3000](http://locahlost:3000).

## Production

Run these commands:

```zsh
npm i         # install dependencies
npm run build # begin the build process
npm run start # start production server
```

This would start the production server at
[http://locahlost:3000](http://locahlost:3000).

Afterward, you can deploy this site at [https://vercel.com](https://vercel.com).

Alternatively, you can configure a reverse proxy (e.x Nginx) that would handle
the SSL certificate and forward the requests to port 80, which should be made
externally available.

## Works Cited

- The boilerplate for a starter Next.JS project was copied from
  [here](https://github.com/maxxxxxdlp/max.patii.uk)

## Tech stack

- Next.JS
- React
- Tailwind CSS
- Typescript
- Babel
- Webpack

## Tools Used

Tools used in the process of development

- Git
- pre-commit.com
- GitHub
- Vim
- PyCharm

## Licence

This code is available under MIT Licence
