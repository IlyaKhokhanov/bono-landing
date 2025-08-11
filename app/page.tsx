import Header from '@/containers/header/Header';
import Main from '@/containers/main/Main';
import Card from '@/containers/card/Card';
import App from '@/containers/app/App';
import Customize from '@/containers/customize/Customize';
import Faqs from '@/containers/faqs/Faqs';
import Footer from '@/containers/footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Main />
        <Card />
        <App />
        <Customize />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
