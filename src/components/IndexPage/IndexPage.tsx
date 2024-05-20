import { ApiSettings } from "../ApiSettings";
import { TonConnectButton } from "@tonconnect/ui-react";
import { DeployNfts } from "../DeployNfts";

export function IndexPage() {
  return (
    <div className="container mx-auto pt-4 pb-12">
      <DeployNfts />
    </div>
  );
}
