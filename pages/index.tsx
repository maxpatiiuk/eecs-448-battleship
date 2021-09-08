import Game from '../components/Game';
import Layout from '../components/Layout';
import siteInfo from '../const/siteInfo';

export default function index(): JSX.Element {
  return (
    <Layout>
      {(language): JSX.Element => (
        <div className="flex flex-col w-full">
          <h1 className="text-6xl text-center">{siteInfo[language].title}</h1>
          <div className="flex flex-col justify-center flex-1">
            <div>
              <Game language={language} />
            </div>
          </div>
          <span />
        </div>
      )}
    </Layout>
  );
}
