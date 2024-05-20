import { createRoot } from "react-dom/client";
import "./index.css";
import "@hookstate/devtools";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React from "react";
import { IndexPage } from "./components/IndexPage/IndexPage";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://minter.ton.org/tonconnect-manifest.json"
      walletsListConfiguration={{
        includeWallets: [
          {
            name: "TonDevWallet",
            aboutUrl: "https://github.com/tondevwallet/tondevwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            deepLink: "tondevwallet://connect/",
            imageUrl:
              "https://raw.githubusercontent.com/TonDevWallet/TonDevWallet/main/src-tauri/icons/Square284x284Logo.png",
            universalLink: "tondevwallet://connect/",
            appName: "TonDevWallet",
            platforms: ["ios", "android", "macos", "windows", "linux"],
          },
        ],
      }}
    >
      <React.Suspense>{<IndexPage />}</React.Suspense>
    </TonConnectUIProvider>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
