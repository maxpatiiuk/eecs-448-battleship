import Layout from '../components/Layout';
import type { LanguageStringsStructure } from '../lib/languages';

const languageStrings: LanguageStringsStructure<{}> = {
  'en-US': {},
};

export default function index(): JSX.Element {
  return <Layout>{(language): JSX.Element => <i>Nothing here yet</i>}</Layout>;
}
