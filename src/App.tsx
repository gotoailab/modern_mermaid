import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <GoogleAnalytics />
        <Layout />
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
