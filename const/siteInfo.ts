import type { LanguageStringsStructure } from '../lib/languages';
import { strip } from '../lib/localizationHelper';

const siteInfo: LanguageStringsStructure<{
  title: string;
  description: string;
  keywords: string;
  author: string;
  yes: string;
  no: string;
}> = {
  'en-US': {
    title: 'EECS 448: Battleship',
    description: strip(`EECS 448: Battleship`),
    keywords: strip(`EECS 448: Battleship`),
    author: 'EECS 448 Team 5',
    yes: 'Yes',
    no: 'No',
  },
};

export default siteInfo;
