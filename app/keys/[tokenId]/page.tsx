import { notFound } from "next/navigation";
import { isAddress } from "viem";
import { Grid, GridCol } from "@mantine/core";
import TokenCard from "../../_components/TokenCard";
import MintForm from "../../_components/MintForm";
import TokenActionTabs from "../../_components/TokenActionTabs";

function Page({ params }: { params: { tokenId: `0x${string}` } }) {
  const { tokenId } = params;

  if (!isAddress(tokenId)) notFound(); // should we redirect to homepage?

  return (
    <>
      <Grid pb="xl">
        <GridCol span={{ xs: 6, sm: 5, md: 4 }}>
          <TokenCard tokenId={tokenId} />
        </GridCol>
        <GridCol span={{ xs: 6, sm: 7, md: 8 }}>
          <TokenActionTabs tokenId={tokenId} />
        </GridCol>
      </Grid>
    </>
  );
}

export default Page;
