import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkModeProvider } from './contexts/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
