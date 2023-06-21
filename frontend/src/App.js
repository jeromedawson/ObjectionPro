import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ObjectionsProvider } from './context/ObjectionsContext';
import { ScriptsProvider } from './context/ScriptsContext';
import ObjectionsPage from './pages/ObjectionsPage';
import ScriptsPage from './pages/ScriptsPage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './translations/en.json';
import frTranslation from './translations/fr.json';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundaryFallback } from './components/ErrorBoundaryFallback';

const queryClient = new QueryClient();

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <ObjectionsProvider>
              <ScriptsProvider>
                <Switch>
                  <Route exact path="/">
                    <ObjectionsPage />
                  </Route>
                  <Route exact path="/scripts">
                    <ScriptsPage />
                  </Route>
                </Switch>
              </ScriptsProvider>
            </ObjectionsProvider>
          </Router>
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
