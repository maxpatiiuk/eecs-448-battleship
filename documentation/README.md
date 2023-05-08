# Documentation

This is a general documentation for EECS 448 Battleship game.

This guide contains information on getting the development and production server
up, as well as information about tools used in the process of development and
works cited.

## Time Estimate

[Time estimate](time-estimate.md) and [actual accounting of time taken](time-accounting.md).

## Development

Clone this repository

```zsh
git clone https://github.com/maxpatiiuk/eecs-448-battleship
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
git clone https://github.com/maxpatiiuk/eecs-448-battleship
```

Configure a reverse proxy (e.x Nginx) that would serve eecs-448-battleship
folder on a public URL and handle the SSL certificate. Have players connect 
to the public instance to play with each other.

## Documentation Generation

Documentation can be auto-generated with the tool [Documentation.js](https://documentation.js.org/). To
install documentation.js globally using npm:

```zsh
npm install -g documentation
```

The generated documentation files will be found under `docs-gen` and are
compiled to html. This documentation framework follows JSDoc tags - all
supported tags and formatting can be found [here](https://jsdoc.app/) on JSDoc's
website.

To generate new documentation recursively for all files within the
`eecs-448-battleship` directory, start in the root of the repository and run:

```zsh
documentation build eecs-448-battleship/** -f html -o documentation/auto-docs-gen
```

Open `docs-gen/index.html` in your browser to view the static docs.

## Works Cited

#### Code References
- The boilerplate for a starter project was copied from
  [here](https://github.com/maxpatiiuk/max.patii.uk). Then, it was modified to
  remove dependency on Next.js, React and Tailwind.CSS
- Game board is rendered using table elements for the sake of accessibility, but
  it is styled as a grid, for the sake of convenience.
  [User-agent table styles reset](https://github.com/maxpatiiuk/eecs-448-battleship/blob/main/eecs-448-battleship/components/Board/styles.css#L12)
  was copied from [here](https://stackoverflow.com/a/27851231/8584605) (with
  modifications)
- [Basic OOP implementation of MVC](https://github.com/maxpatiiuk/eecs-448-battleship/blob/1c3ab08b1ac0621307e7af35c2ad064e9491836a/eecs-448-battleship/lib/js/view.js#L11)
  was inspired by [Backbone.js](https://backbonejs.org/) (except, we simplified
  and modernized it)
#### Documentation References
- Answered questions on JSDoc syntax:
https://stackoverflow.com/questions/46454372/grouping-functions-in-jsdoc-generated-documentation
https://stackoverflow.com/questions/19230971/how-do-i-jsdoc-a-nested-objects-methods
https://stackoverflow.com/questions/14611995/how-to-specify-an-array-of-objects-as-a-parameter-or-return-value-in-jsdoc
https://stackoverflow.com/questions/6460604/how-to-describe-object-arguments-in-jsdoc
https://stackoverflow.com/questions/28763257/jsdoc-return-object-structure
https://stackoverflow.com/questions/30058201/adding-static-files-to-jsdoc

- JSDocs Implementation Used:
https://documentation.js.org/

- Tag reference:
https://jsdoc.app/

## Tech stack

- JavaScript
- ESLint
- Prettier
- Stylelint

## Tools Used

Tools used in the process of development

- Git
- pre-commit.com
- GitHub
- Vim
- PyCharm
- Visual Studio CODE
- Documentation.js

## Licence

This code is available under MIT Licence
