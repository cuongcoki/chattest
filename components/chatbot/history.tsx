"use client"

import { useState, useEffect } from "react";
import { IconCirclePlusFilled } from "@tabler/icons-react";

import { historyApi, createApi, deleteChatHistoryApi } from "@/api/chatbotApi"; // Thêm createApi vào import
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Trash } from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";

interface ChatTitle {
  session_id: number;
  timestamp: string;
  title: string;
}

interface ChatTitleList {
  title_list: ChatTitle[];
}

interface CreateChat {
  current_session_id: number;
  session_id: number;
  user_id: string;

}

interface DataRe {
  message: string;
  session_id: number;

}
export default function History() {
  const { userData, accessToken } = useAuthStore();
  const { setSessionId, sessionId } = useChatStore();
  const [messagesHistory, setMessagesHistory] = useState<ChatTitle[]>([]);
  // console.log("sessionId", sessionId)

  const router = useRouter();
  //=============================================================== [Call API getHistory chat] ===============================================================
  const fetchHistoryMessages = async () => {
    // console.log("UserID:", userData?.sub);

    if (!userData?.sub) {
      console.warn("User chưa đăng nhập hoặc thiếu userId");
      return;
    }

    try {
      const response = await historyApi(userData.sub);
      console.log("historyApi", response)
      const history: ChatTitleList = response as ChatTitleList;
      if (history?.title_list) {
        setMessagesHistory(history.title_list);
      } else {
        setMessagesHistory([]);
      }
    } catch (error) {
      console.log(error)
      toast.error("lỗi")
    }
  };

  //=============================================================== [Tạo chat session mới] ===============================================================
  const createNewSession = async () => {
    if (!accessToken) {
      toast.error("đăng nhập hết hạn");
      return;
    }
    const reponse = await createApi(accessToken);
    console.log("createt", reponse);
    const createChat: CreateChat = reponse as CreateChat;
    setSessionId(createChat.current_session_id)
    fetchHistoryMessages();
    toast.success("Tạo chat mới thành công");
  };

  const handleSaveLocalStorage = async (id: number) => {
    setSessionId(id)
    localStorage.setItem('sessionId', id.toString());
  }

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(Number(storedSessionId)); // Khôi phục giá trị từ localStorage
    }
  }, []);
  //=============================================================== [Gọi lịch sử chat khi user thay đổi] ===============================================================

  //=============================================================== [Xóa chat session] ===============================================================
  const handleDeleteSession = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent onClick (chat selection)

    if (!accessToken) {
      toast.error("Đăng nhập hết hạn");
      return;
    }

    try {
      const response = await deleteChatHistoryApi(accessToken, id);
      console.log("reponse", response)
      const data: DataRe = response as DataRe
      console.log(data)
      setSessionId(data.session_id);
      // If the deleted session was the active one, clear sessionId from store and localStorage
      if (sessionId === id || Number(localStorage.getItem('sessionId')) === id) {
        setSessionId(data.session_id);
        localStorage.removeItem('sessionId');
      }
      // localStorage.setItem(data.session_id);
      // Refresh the history list 
      fetchHistoryMessages();
      toast.success("Xóa chat thành công");
    } catch (error) {
      console.error("Lỗi khi xóa chat:", error);
      toast.error("Lỗi khi xóa chat");
    }
  };

  useEffect(() => {
    fetchHistoryMessages();
  }, [userData?.sub]);

  const handleSignIn = () => {
    router.push("/sign-up");
  };

  console.log("userData", userData)

  //=============================================================== [Render Component] ===============================================================
  return (
    <div className="w-full md:w-1/4 bg-blue-50 dark:bg-slate-800 rounded-lg p-4 shadow-md transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-blue-800 dark:text-white font-bold text-sm md:text-xl text-center">
          LỊCH SỬ TRA CỨU HỌC TẬP
        </h4>

        {userData !== null ? (
          <Button
            size="icon"
            onClick={createNewSession}
            className=" bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
          >
            <IconCirclePlusFilled />
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
              >
                <IconCirclePlusFilled />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogDescription className="text-xl text-gray-800 dark:text-gray-100">
                  Hãy đăng ký là thành viên để sử dụng tính năng này
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                >
                  ĐĂNG KÝ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <ScrollArea className="md:max-h-[400px] max-h-[200px]">
        <div className="md:max-h-[400px] max-h-[190px]">
          {messagesHistory.length > 0 ? (
            <div className="space-y-2">
              {messagesHistory.map((item) => (
                <div key={item.session_id} className="flex items-center">
                  <span
                    onClick={() => handleSaveLocalStorage(item.session_id)}
                    className={`flex items-center justify-between gap-2 p-2 sm:p-3 rounded-lg cursor-pointer w-full transition-all duration-300 ease-in-out 
                ${sessionId === null
                        ? Number(localStorage.getItem("sessionId")) === item.session_id
                          ? "bg-blue-600 dark:bg-slate-700 text-white shadow-md"
                          : "bg-blue-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white text-blue-800 dark:text-white"
                        : sessionId === item.session_id
                          ? "bg-blue-600 dark:bg-slate-700 text-white shadow-md"
                          : "bg-blue-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white text-blue-800 dark:text-white"
                      }`}
                  >
                    <span className="md:text-lg text-sm">{item.title || "Không có tiêu đề"}</span>
                    <button onClick={(e) => handleDeleteSession(item.session_id, e)}>
                      <Trash
                        size={20}
                        className={` text-while dark:text-white hover:text-red-600 transition-all duration-300 ease-in-out`}
                      />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 text-gray-500 dark:text-gray-400 italic">
              Không có lịch sử chat
            </div>
          )}
        </div>
      </ScrollArea>
    </div>

  );
}