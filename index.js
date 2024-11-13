import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import bs58 from 'bs58';
import * as fs from 'fs';

// Function to generate a Solana wallet from a seed phrase
function generateWalletFromSeed(seed) {
  const seedBuffer = bip39.mnemonicToSeedSync(seed).slice(0, 32);
  const keypair = Keypair.fromSeed(seedBuffer);
  const publicKey = keypair.publicKey.toString();
  const privateKey = bs58.encode(keypair.secretKey);
  return { seed, publicKey, privateKey };
}

// Function to generate multiple wallets
function generateMultipleWallets(count) {
  const wallets = [];
  for (let i = 0; i < count; i++) {
    const seed = bip39.generateMnemonic();
    const wallet = generateWalletFromSeed(seed);
    wallets.push(wallet);
  }
  return wallets;
}

// Generate and print 5 wallets
const walletCount = 100;
const wallets = generateMultipleWallets(walletCount);

console.log('Generated Solana Wallets:');
wallets.forEach((wallet, index) => {
  console.log(`Wallet ${index + 1}`);
  console.log(`Seed Phrase: ${wallet.seed}`);
  console.log(`Public Key: ${wallet.publicKey}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  console.log('-------------------------');
});

// Save wallets to a JSON file
const walletFilePath = 'solana_wallets.json';
fs.writeFile(walletFilePath, JSON.stringify(wallets, null, 2), (err) => {
  if (err) {
    console.error('Error writing to wallet file', err);
  } else {
    console.log(`Wallets saved to ${walletFilePath}`);
  }
});

// Save seed phrases to a separate file
const seedPhrases = wallets.map(wallet => wallet.seed);
const seedFilePath = 'solana_seed_phrases.txt';
fs.writeFile(seedFilePath, seedPhrases.join('\n'), (err) => {
  if (err) {
    console.error('Error writing to seed file', err);
  } else {
    console.log(`Seed phrases saved to ${seedFilePath}`);
  }
});

// Save public keys to a separate file
const publicKeys = wallets.map(wallet => wallet.publicKey);
const publicKeyFilePath = 'solana_public_keys.txt';
fs.writeFile(publicKeyFilePath, publicKeys.join('\n'), (err) => {
  if (err) {
    console.error('Error writing to public key file', err);
  } else {
    console.log(`Public keys saved to ${publicKeyFilePath}`);
  }
});

// Save private keys to a separate file
const privateKeys = wallets.map(wallet => wallet.privateKey);
const privateKeyFilePath = 'solana_private_keys.txt';
fs.writeFile(privateKeyFilePath, privateKeys.join('\n'), (err) => {
  if (err) {
    console.error('Error writing to private key file', err);
  } else {
    console.log(`Private keys saved to ${privateKeyFilePath}`);
  }
});