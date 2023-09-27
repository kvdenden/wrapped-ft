"use client";

import { useState } from "react";
import { Alert, Button, Grid, NumberInput, Space, Stack, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
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
    <>
      <Stack gap="xs">
        {!!mintPrice.data && !!balance.data && mintPrice.data > balance.data.value && (
          <Alert title="Insufficient funds" color="red" icon={<IconInfoCircle />}>
            Total price exceeds the balance of your account.
          </Alert>
        )}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" fw={500} span>
              Total price
            </Text>
            <Title order={4} size="h2" fw="bold">
              <Space />
              <>{mintPrice.data && <Price value={mintPrice.data} />}</>
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput label="Amount" value={amount} onChange={setAmount} min={1} allowDecimal={false} />
          </Grid.Col>
        </Grid>
        <Space />
        <Button onClick={mint.write} loading={tx.isLoading} disabled={!prepareMint.isSuccess} size="lg">
          Buy now
        </Button>
      </Stack>
    </>
  );
};

export default MintForm;
