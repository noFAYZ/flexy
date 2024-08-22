import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shortens an Ethereum address to a more readable format.
 * @param {string} address - The full Ethereum address to shorten.
 * @param {number} [prefixLength=6] - Number of characters to show at the start.
 * @param {number} [suffixLength=4] - Number of characters to show at the end.
 * @returns {string} The shortened address.
 */
export function shortenEthAddress(address: string, prefixLength: number = 6, suffixLength: number = 4): string {
  if (!address) return '';
  
  // Check if the address is valid (basic check for length and hex format)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    console.warn('Invalid Ethereum address format');
    return address;
  }

  // Ensure the prefix and suffix lengths are not too long
  const maxLength = Math.floor(address.length / 2);
  prefixLength = Math.min(prefixLength, maxLength);
  suffixLength = Math.min(suffixLength, maxLength);

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}