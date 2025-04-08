"use client"

import { useState, useEffect } from "react";
import { IconCirclePlusFilled } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { historyApi, createApi } from "@/api/chatbotApi"; // Thêm createApi vào import
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import toast from "react-hot-toast";

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

export function NavMain() {
  const { userData, accessToken } = useAuthStore();
  const { setSessionId, sessionId } = useChatStore();
  const [messagesHistory, setMessagesHistory] = useState<ChatTitle[]>([]);

  //=============================================================== [Call API getHistory chat] ===============================================================
  const fetchHistoryMessages = async () => {
    // console.log("UserID:", userData?.sub);

    if (!userData?.sub) {
      console.warn("User chưa đăng nhập hoặc thiếu userId");
      return;
    }

    try {
      const response = await historyApi(userData.sub);
      // console.log("historyApi", response)
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
    // console.log("createt", reponse);
    const createChat: CreateChat = reponse as CreateChat;
    setSessionId(createChat.current_session_id)
    fetchHistoryMessages();
    toast.success("Tạo chat mới thành công");
  };

  //=============================================================== [Gọi lịch sử chat khi user thay đổi] ===============================================================
  useEffect(() => {
    fetchHistoryMessages();
  }, [userData?.sub]);

  //=============================================================== [Render Component] ===============================================================
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        {/* Nút Tạo đoạn chat */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Tạo đoạn chat"
              onClick={createNewSession} // ✅ Thêm onClick để tạo chat
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Tạo đoạn chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Danh sách lịch sử chat */}
        <SidebarMenu>
          {messagesHistory.length > 0 ? (
            messagesHistory.map((item) => (
              <SidebarMenuItem key={item.session_id} className="flex items-center">
                <SidebarMenuButton
                  onClick={() => setSessionId(item.session_id)}
                  className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
                    ${sessionId === item.session_id
                      ? "bg-yellow-500 shadow-lg text-white"
                      : "hover:bg-yellow-500 hover:text-white"
                    }`}
                >
                  {item.title || "Không có tiêu đề"}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                Không có lịch sử chat
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
