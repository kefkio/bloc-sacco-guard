import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

type Addresses = Record<string, Record<string, string>>

export function readAddress(
  name: string,
  network: string = process.env.HARDHAT_NETWORK || 'local'
): string {
  const file = resolve(__dirname, '..', 'deployments', 'addresses.json')
  if (!existsSync(file)) {
    throw new Error('❌ No addresses.json file found in deployments/')
  }

  const data: Addresses = JSON.parse(readFileSync(file, 'utf8'))
  const networkData = data[network]

  if (!networkData || !networkData[name]) {
    throw new Error(`⚠️ No address found for ${name} on network ${network}`)
  }

  return networkData[name]
}
