import _ from "lodash";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { usePublicClient } from "wagmi";
import { getAddress, numberToHex } from "viem";

import useFT from "./useFT";

const toAddress = (tokenId: number | bigint) => getAddress(numberToHex(tokenId, { size: 20 }));

const useTokenBalances = (account: `0x${string}` | undefined) => {
  const ft = useFT();
  const client = usePublicClient();

  const [tokenBalances, setTokenBalances] = useState({} as { [index: `0x${string}`]: bigint });

  useEffect(() => {
    let ignore = false;
    setTokenBalances({});

    if (!account) return;

    const updateBalance = async (...ids: bigint[]) => {
      if (ids.length === 0) return;

      const balanceOfBatch = await client.readContract({
        ...ft,
        functionName: "balanceOfBatch",
        args: [Array(ids.length).fill(account), ids],
      });

      if (!ignore) {
        setTokenBalances(
          produce((tokenBalances) => {
            ids.forEach((id, i) => {
              const key = toAddress(id);
              const balance = balanceOfBatch[i];
              if (balance) {
                tokenBalances[key] = balance;
              } else {
                delete tokenBalances[key];
              }
            });
          })
        );
      }
    };

    const fetchTokens = async () => {
      const transferSingle = await client.createContractEventFilter({
        ...ft,
        eventName: "TransferSingle",
        args: {
          to: account,
        },
        strict: true,
      });

      const transferBatch = await client.createContractEventFilter({
        ...ft,
        eventName: "TransferBatch",
        args: {
          to: account,
        },
        strict: true,
      });

      const transferSingleLogs = await client.getFilterLogs({ filter: transferSingle });
      const transferBatchLogs = await client.getFilterLogs({ filter: transferBatch });

      const tokenIds = _.union(
        transferSingleLogs.map((log) => log.args.id),
        transferBatchLogs.flatMap((log) => log.args.ids)
      );

      updateBalance(...tokenIds);
    };

    const watchTokens = () => {
      const unwatchSendSingle = client.watchContractEvent({
        ...ft,
        eventName: "TransferSingle",
        args: {
          from: account,
        },
        onLogs: (logs) => {
          const tokenIds = _.uniq(logs.map((log) => log.args.id!));
          updateBalance(...tokenIds);
        },
      });
      const unwatchReceiveSingle = client.watchContractEvent({
        ...ft,
        eventName: "TransferSingle",
        args: {
          to: account,
        },
        onLogs: (logs) => {
          const tokenIds = _.uniq(logs.map((log) => log.args.id!));
          updateBalance(...tokenIds);
        },
      });
      const unwatchSendBatch = client.watchContractEvent({
        ...ft,
        eventName: "TransferBatch",
        args: {
          from: account,
        },
        onLogs: (logs) => {
          const tokenIds = _.uniq(logs.flatMap((log) => log.args.ids!));
          updateBalance(...tokenIds);
        },
      });
      const unwatchReceiveBatch = client.watchContractEvent({
        ...ft,
        eventName: "TransferBatch",
        args: {
          to: account,
        },
        onLogs: (logs) => {
          const tokenIds = _.uniq(logs.flatMap((log) => log.args.ids!));
          updateBalance(...tokenIds);
        },
      });

      return () => {
        unwatchSendSingle();
        unwatchReceiveSingle();
        unwatchSendBatch();
        unwatchReceiveBatch();
      };
    };

    fetchTokens();
    const unwatch = watchTokens();

    return () => {
      ignore = true;
      unwatch();
    };
  }, [account, ft, client]);

  return tokenBalances;
};

export default useTokenBalances;
