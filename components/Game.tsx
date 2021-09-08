import { AvailableLanguages, LanguageStringsStructure } from '../lib/languages';

const languageStrings: LanguageStringsStructure<{
  chooseNumberOfShips: string;
  shipPlacement: string;
}> = {
  'en-US': {
    chooseNumberOfShips: `Before the game can begin, please choose the
      number of ships you want to play with:`,
    shipPlacement: `Now, place your ships on the board:`,
  },
};

export default function Game({
  language,
}: {
  language: AvailableLanguages['type'];
}): JSX.Element {
  return <p>{languageStrings[language].chooseNumberOfShips}</p>;
}
