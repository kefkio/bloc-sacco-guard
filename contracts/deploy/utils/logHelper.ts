import chalk from 'chalk'

export function logInfo(message: string) {
  console.log(chalk.cyan(`[INFO ${new Date().toLocaleTimeString()}] ${message}`))
}

export function logSuccess(message: string) {
  console.log(chalk.green(`[SUCCESS ${new Date().toLocaleTimeString()}] ${message}`))
}

export function logError(message: string) {
  console.log(chalk.red(`[ERROR ${new Date().toLocaleTimeString()}] ${message}`))
}
