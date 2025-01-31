"use client";

import MessageList from "@/components/chat/MessageList";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import { useFetchChatroomsByUserId } from "@/hooks/chat/useFetchChatroomsByUserId";
import { Chatroom } from "@/types/chatroom";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useFetchChatroomsByUserId 훅을 사용하여 채팅 목록을 가져옴
  const { data, error, isLoading } = useFetchChatroomsByUserId();

  // 로딩 중일 때 표시할 내용
  if (isLoading) {
    return (
      <>
        <div className="text-40 font-bold text-teal900">채팅 목록</div>
        <Loading />
      </>
    );
  }

  // 에러 발생 시 표시할 내용
  if (error) {
    return <p>Error fetching chatrooms: {error.message}</p>;
  }

  // 데이터 확인용 콘솔 로그
  console.log("Fetched chatroom data:", data);

  return (
    <>
      <div className="text-40 font-bold text-teal900">채팅 목록</div>
      <div className="flex gap-12 px-40 py-20">
        <div className="scrollbar-custom flex h-[767px] w-[344px] flex-col gap-12 overflow-y-auto rounded-12 border border-warmGray200 p-14">
          {data?.length ? (
            data.map((chatroom: Chatroom, index: number) => (
              <MessageList
                key={index}
                roomId={chatroom.roomId}
                profileImage={
                  chatroom.partnerImage
                    ? `data:image/png;base64,${chatroom.partnerImage}`
                    : "/profile.png"
                }
                partner={chatroom.partner}
                lastMsg={chatroom.lastMsg}
                recentCreatedAt=""
                isRead={true} // 임의로 읽음 처리
                // TODO: 읽음 처리에 대한 로직
              />
            ))
          ) : (
            <p>채팅방이 없습니다.</p>
          )}
        </div>
        <div className="flex h-[767px] flex-grow flex-col items-center justify-center rounded-12 bg-coolGray100 p-20">
          {children}
        </div>
      </div>
    </>
  );
}
