import { endpoints } from "./endpoint";

const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
  token?: string,
  parseError?: (data: any) => string
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    data = null; // Trường hợp không phải JSON
  }

  if (!res.ok) {
    let message = "";

    // Kiểm tra nếu status là 401 thì chuyển về trang login
    if (res.status === 401) {
      window.location.href = "/sign-in";
      return Promise.reject(new Error("Unauthorized"));
    }

    // Nếu có custom parseError thì dùng
    if (parseError) {
      message = parseError(data);
    } else {
      // Mặc định: fallback nếu không truyền parseError
      message = data?.message || res.statusText || "Có lỗi xảy ra!";
    }

    throw new Error(message);
  }

  return data;
};




export const historyApi = async (userId: number) => {
  return fetcher(`${endpoints.chat.historyChat}/${userId}`, {
    method: "GET",
  });
};

export const createApi = async (token: string) => {
  return fetcher(
    endpoints.chat.createChat,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    token
  );
};


export const chatMessagesApi = async (token: string | null, sessionId: number | null) => {
  return fetcher(
    `${endpoints.chat.chatMessages}/${sessionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const sendMessagesApi = async (
  sessionId: number,
  imageFile: File | null,
  text: string,
  token: string
) => {
  const formData = new FormData();
  if (imageFile) {
    formData.append("image", imageFile);
  }
  formData.append("text", text);
  formData.append("session_id", String(sessionId));

  // console.log("formData", formData.getAll);

  return fetch(`${endpoints.chat.sentMessages}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const deleteChatHistoryApi = async(token: string,sessionId:number)=>{
  return fetcher(`${endpoints.chat.deleteChatHistory}/${sessionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


