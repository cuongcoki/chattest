// lib/endpoint.ts



const BASE_URL = "http://14.225.211.7:8504";

export const endpoints = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
  },

  chat:{
    historyChat:`${BASE_URL}/chat/user`,
    createChat :`${BASE_URL}/chat/create_session`,
    chatMessages :`${BASE_URL}/chat/session`,
    sentMessages : `${BASE_URL}/query`,
  }
};
