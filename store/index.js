import { vuexfireMutations } from 'vuexfire'

export const mutations = { //storeのindex.jsに作る必要がある
  ...vuexfireMutations //vuexfireが用意しているmutationが使えるようになる
}
