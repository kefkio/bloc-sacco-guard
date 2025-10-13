import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

type Addresses = Record<string, Record<string, string>>

export function writeAddress(name: string, address: string, network: string = process.env.HARDHAT_NETWORK || 'local') {
  const dir = resolve(__dirname, '..', 'deployments')
  const file = resolve(dir, 'addresses.json')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  let data: Addresses = {}
  if (existsSync(file)) {
    data = JSON.parse(readFileSync(file, 'utf8'))
  }
  if (!data[network]) data[network] = {}
  data[network][name] = address
  writeFileSync(file, JSON.stringify(data, null, 2))
}


