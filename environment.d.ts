namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ALCHEMY_KEY: string;
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;

    NEXT_PUBLIC_TOKEN_METADATA_URI: string;

    NEXT_PUBLIC_FT_CONTRACT_ADDRESS: `0x${string}`;
    NEXT_PUBLIC_WRAPPED_FT_CONTRACT_ADDRESS: `0x${string}`;
  }
}
