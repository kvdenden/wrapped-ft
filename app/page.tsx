import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenCard from "./_components/TokenCard";
import Portfolio from "./_components/Portfolio";

function Page() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
      {/* <div>
        <TokenCard tokenId="0xaD256f1379FaeBB3B3856156Cc889756712cd620" />
      </div> */}
      <Portfolio />
    </>
  );
}

export default Page;
