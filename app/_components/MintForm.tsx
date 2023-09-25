"use client";

import { Button, Group, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import useFT from "../_hooks/useFT";
import Price from "./Price";

type TokenProps = {
  tokenId: `0x${string}`;
};

const MintForm = ({ tokenId }: TokenProps) => {
  const [amount, setAmount] = useState<string | number>(1);

  const ft = useFT();
  const account = useAccount();
  const balance = useBalance(account);

  // TODO: make sure mint price is in sync with amount (handle contract read delay)
  const mintPrice = useContractRead({
    ...ft,
    functionName: "mintPrice",
    args: [tokenId, BigInt(amount)],
    watch: true,
  });

  // console.log("mintPrice", mintPrice);

  const prepareMint = usePrepareContractWrite({
    ...ft,
    functionName: "mint",
    args: [account.address!, tokenId, BigInt(amount)],
    value: mintPrice.data ?? BigInt(0),
    enabled: !mintPrice.isFetching && !!mintPrice.data && !!balance.data && mintPrice.data <= balance.data.value,
  });
  const mint = useContractWrite(prepareMint.config);
  const tx = useWaitForTransaction({ hash: mint.data?.hash });

  return (
    // <Paper>
    <>
      <Stack gap="xs">
        <NumberInput label="Amount" value={amount} onChange={setAmount} min={1} allowDecimal={false} />
        <Text size="sm" c="dimmed">
          Total price <>{mintPrice.data && <Price value={mintPrice.data} />}</>
        </Text>
        <Button onClick={mint.write} loading={tx.isLoading} disabled={prepareMint.isError} size="lg">
          Buy now
        </Button>
      </Stack>
    </>
    // </Paper>
  );
};

export default MintForm;
