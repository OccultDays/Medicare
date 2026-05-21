/*
 * App.tsx — MediCare Hospital System
 * Rotas: /login, /dashboard, /pacientes, /medicos, /consultas, /prontuarios
 * Proteção de rotas via AuthContext
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";
import Consultas from "./pages/Consultas";
import Prontuarios from "./pages/Prontuarios";
import NotFound from "./pages/NotFound";
import { PWAInstallBanner, OfflineBanner } from "./components/PWABanner";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect to="/login" />;
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();

  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/pacientes">
        <ProtectedRoute component={Pacientes} />
      </Route>
      <Route path="/medicos">
        <ProtectedRoute component={Medicos} />
      </Route>
      <Route path="/consultas">
        <ProtectedRoute component={Consultas} />
      </Route>
      <Route path="/prontuarios">
        <ProtectedRoute component={Prontuarios} />
      </Route>
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            <OfflineBanner />
            <PWAInstallBanner />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
