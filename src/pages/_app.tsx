import { AuthProvider } from "@/contexts/AuthContext";
import { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

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
