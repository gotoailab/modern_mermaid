import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}

export default App;
