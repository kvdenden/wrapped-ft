"use client";

import { useCallback, useEffect, useState } from "react";
import { ActionIcon, Avatar, Box, Combobox, Group, Skeleton, Stack, Text, TextInput, useCombobox } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import useWalletInfo from "../_hooks/useWalletInfo";

type SearchResultProps = {
  username?: string;
  wallet: `0x${string}`;
};

type SearchProps = {
  onSelect?: (tokenId: `0x${string}`) => void;
};

type SearchResult = {
  username: string;
  wallet: `0x${string}`;
};

const SearchResultItem = ({ wallet }: SearchResultProps) => {
  const walletInfo = useWalletInfo(wallet);

  return (
    <>
      <Group wrap="nowrap">
        <Avatar src={walletInfo?.twitterPfpUrl} alt={walletInfo?.twitterUsername} />
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
          <Group>
            {walletInfo ? (
              <Text fw="bold">@{walletInfo.twitterUsername}</Text>
            ) : (
              <Skeleton height="1.55em" width={100} />
            )}
          </Group>

          <Text size="xs" c="dimmed" truncate="end">
            {wallet}
          </Text>
        </div>
      </Group>
    </>
  );
};

const TokenSearch = ({ onSelect }: SearchProps) => {
  const combobox = useCombobox();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[] | undefined>([]);

  // useEffect(() => {
  //   combobox.selectFirstOption();
  // }, [combobox, results]);

  const search = useCallback(async (query: string) => {
    setLoading(true);

    console.log("search for ", query);

    // TODO: handle wallet address as query (look up username?)

    try {
      const { results } = await fetch(`${process.env.NEXT_PUBLIC_FTAPI_BASE_URL}/search?q=${query}`).then((res) =>
        res.json()
      );

      console.log("results", results);

      setResults(results);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }, []);

  const searchResultOptions = results
    ? results
        .filter((result) => result.username.includes(value.toLowerCase()))
        .slice(0, 5) // TODO: sort by levenshtein distance to query?
        .map((result) => (
          <Combobox.Option value={result.wallet} key={result.wallet}>
            <SearchResultItem {...result} />
          </Combobox.Option>
        ))
    : [];

  return (
    <>
      <Combobox
        onOptionSubmit={(option) => {
          onSelect && onSelect(option as `0x${string}`);
          // setValue(option);
          combobox.closeDropdown();
        }}
        store={combobox}
        withinPortal={false}
      >
        <Combobox.Target>
          <form
            onSubmit={(e) => {
              console.log("submit", value);
              search(value).then(() => {
                combobox.openDropdown();
                // combobox.selectFirstOption();
              });
              e.preventDefault();
            }}
          >
            {/* TODO: submit form using enter when dropdown  */}
            <TextInput
              value={value}
              onChange={(e) => {
                setValue(e.currentTarget.value);
                combobox.resetSelectedOption();
              }}
              radius="xl"
              size="md"
              placeholder="Search"
              rightSectionWidth={42}
              rightSection={
                <ActionIcon type="submit" size={32} radius="xl" variant="filled" loading={loading}>
                  <IconSearch fontSize="sm" stroke={1.5} />
                </ActionIcon>
              }
            />
          </form>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {searchResultOptions}
            {searchResultOptions.length === 0 && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default TokenSearch;
