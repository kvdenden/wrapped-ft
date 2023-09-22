import { useEffect, useState } from "react";

type Metadata = {
  name: string;
  image?: string;
  external_url?: string;
};

const fetchMetadata = async (tokenId: `0x${string}`) => {
  const id = tokenId.slice(2).padStart(64, "0");
  const uri = process.env.NEXT_PUBLIC_TOKEN_METADATA_URI.replace("{id}", id);

  const metadata: Metadata = await fetch(uri).then((res) => res.json());

  return metadata;
};

const useMetadata = (tokenId: `0x${string}`) => {
  const [metadata, setMetadata] = useState<Metadata | undefined>();

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const metadata = await fetchMetadata(tokenId);

      if (!ignore) {
        setMetadata(metadata);
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, [tokenId]);

  return metadata;
};

export default useMetadata;
