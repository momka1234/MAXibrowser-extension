import create from 'zustand';

import { ChainId } from '~/core/types/chains';
import { SUPPORTED_CHAINS } from '~/core/utils/chains';

import { createStore } from '../internal/createStore';

export interface UserChainsState {
  userChains: Record<ChainId, boolean>;
  userChainsOrder: ChainId[];
  updateUserChain: ({
    chainId,
    enabled,
  }: {
    chainId: ChainId;
    enabled: boolean;
  }) => void;
  updateUserChainsOrder: ({
    userChainsOrder,
  }: {
    userChainsOrder: ChainId[];
  }) => void;
}

const chains = SUPPORTED_CHAINS.filter((chain) => !chain.testnet).reduce(
  (acc, chain) => ({
    ...acc,
    [chain.id]: true,
  }),
  {} as Record<ChainId, boolean>,
);

const userChainsOrder = Object.keys(chains).map((id) => Number(id) as ChainId);

export const userChainsStore = createStore<UserChainsState>(
  (set, get) => ({
    userChains: chains,
    userChainsOrder,
    updateUserChain: ({ chainId, enabled }) => {
      const { userChains } = get();
      set({
        userChains: {
          ...userChains,
          [chainId]: enabled,
        },
      });
    },
    updateUserChainsOrder: ({ userChainsOrder }) => {
      set({
        userChainsOrder,
      });
    },
  }),
  {
    persist: {
      name: 'userChains',
      version: 0,
    },
  },
);

export const useUserChainsStore = create(userChainsStore);
