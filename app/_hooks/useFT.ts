import { useMemo } from "react";
import { parseAbi } from "viem";

const ABI = [
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",

  "function mintPrice(address sharesSubject, uint256 amount) public view returns (uint256)",
  "function burnPrice(address sharesSubject, uint256 amount) public view returns (uint256)",

  "function mint(address to, address sharesSubject, uint256 amount) public payable",
  "function burn(address from, address sharesSubject, uint256 amount) public payable",

  "function balanceOf(address owner, uint256 id) public view returns (uint256)",
  "function balanceOfBatch(address[] calldata owners, uint256[] calldata ids) public view returns (uint256[] memory)",

  "function totalSupply(uint256 id) public view returns (uint256)",
  "function exists(uint256 id) public view returns (bool)",
] as const;

const useFT = () => {
  const ft = useMemo(() => ({ address: process.env.NEXT_PUBLIC_WRAPPED_FT_CONTRACT_ADDRESS, abi: parseAbi(ABI) }), []);

  return ft;
};

export default useFT;
