import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = ref({})
  function setUserInfo(info) {
    userInfo.value = info
  }

  return { userInfo, setUserInfo }
})
