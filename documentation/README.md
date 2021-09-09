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

(Optional) Install development dependencies:

```zsh
npm i  # install development dependencies
```

To start a development server, navigate to the inner `eecs-448-battleship`
directory and run this command to start a static server (assuming you have
python installed):

```zsh
python -m http.server 8000
```

Now, navigate to [http://localhost:8000](http://localhost:8000) and start
hacking away!

If you don't have python installed, you can use any one of
[these static web servers](https://gist.github.com/willurd/5720255)

## Production

Clone this repository

```zsh
git clone https://github.com/maxxxxxdlp/eecs-448-battleship
```

Configure a reverse proxy (e.x Nginx) that would serve eecs-448-battleship
folder on a public URL and handle the SSL certificate.

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
