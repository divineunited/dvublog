import { AuthProvider } from "@/contexts/AuthContext";
import { runMigrations } from "@/lib/migrations";
import connectToDatabase from "@/lib/mongodb";
import { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

// Run migrations on app initialization
if (process.env.NODE_ENV === "development") {
  connectToDatabase()
    .then(() => runMigrations())
    .catch(console.error);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="main-wrapper">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
