"use client";

import { Button, Grid, NumberInput, Space, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useFT from "../_hooks/useFT";
import useTokenBalance from "../_hooks/useTokenBalance";
import Price from "./Price";

type TokenProps = {
  tokenId: `0x${string}`;
};

const BurnForm = ({ tokenId }: TokenProps) => {
  const [amount, setAmount] = useState<string | number>(1);
  const [maxAmount, setMaxAmount] = useState<number>(1);

  const ft = useFT();
  const account = useAccount();
  const tokenBalance = useTokenBalance(account.address, tokenId);

  // TODO: make sure mint price is in sync with amount (handle contract read delay)
  const burnPrice = useContractRead({
    ...ft,
    functionName: "burnPrice",
    args: [tokenId, BigInt(amount)],
    watch: true,
  });

  const prepareBurn = usePrepareContractWrite({
    ...ft,
    functionName: "burn",
    args: [account.address!, tokenId, BigInt(amount)],
    value: BigInt(0),
    enabled: !!tokenBalance && tokenBalance >= BigInt(amount),
  });
  const burn = useContractWrite(prepareBurn.config);
  const tx = useWaitForTransaction({ hash: burn.data?.hash });

  useEffect(() => {
    if (tokenBalance) setMaxAmount(Number(tokenBalance));
  }, [tokenBalance]);

  useEffect(() => {
    if (maxAmount < Number(amount)) {
      setAmount(maxAmount);
    }
  }, [maxAmount, amount]);

  return (
    <>
      <Stack gap="xs">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" fw={500} span>
              Total price
            </Text>
            <Title order={4} size="h2" fw="bold">
              <Space />
              <>{burnPrice.data && <Price value={burnPrice.data} />}</>
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput
              label="Amount"
              value={amount}
              onChange={setAmount}
              min={1}
              max={maxAmount}
              allowDecimal={false}
            />
          </Grid.Col>
        </Grid>
        <Space />
        <Button onClick={burn.write} loading={tx.isLoading} disabled={!prepareBurn.isSuccess} size="lg">
          Sell now
        </Button>
      </Stack>
    </>
  );
};

export default BurnForm;
