import "tailwindcss/tailwind.css";
import { DataProvider } from "../contexts/DataContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
export default MyApp;
