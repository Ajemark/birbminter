import { ApiSettings } from "../ApiSettings";
import { TonConnectButton } from "@tonconnect/ui-react";
import { DeployNfts } from "../DeployNfts";

export function IndexPage() {
  return (
    <div className="container mx-auto pt-4 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4">Nft collection tools</h2>
        <div>
          <TonConnectButton />
        </div>
      </div>

      <ApiSettings />

      <DeployNfts />
    </div>
  );
}
