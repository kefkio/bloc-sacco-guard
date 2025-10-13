export const MEMBER_REGISTRY_ADDRESS = import.meta.env.VITE_MEMBER_REGISTRY_ADDRESS as string | undefined;
export const SAVINGS_POOL_ADDRESS = import.meta.env.VITE_SAVINGS_POOL_ADDRESS as string | undefined;
export const LOAN_MANAGER_ADDRESS = import.meta.env.VITE_LOAN_MANAGER_ADDRESS as string | undefined;

export function assertAddress(name: string, value: string | undefined): asserts value is string {
  if (!value) {
    throw new Error(`${name} is not set in .env`);
  }
}


