// lib/endpoint.ts




const BASE_URL = "https://aitoan.girc.edu.vn";

export const endpoints = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    guest: `${BASE_URL}/auth/guest`,
  },

  chat:{
    historyChat:`${BASE_URL}/chat/user`,
    createChat :`${BASE_URL}/chat/create_session`,
    chatMessages :`${BASE_URL}/chat/session`,
    sentMessages : `${BASE_URL}/query`,
    deleteChatHistory: `${BASE_URL}/chat/delete_session`,
  }
};
