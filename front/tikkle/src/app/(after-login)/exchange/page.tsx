"use client";

import Button from "@/components/button/Button";
import Chart from "@/components/chart/Chart";
import { useFetchRate, useFetchRecentRate, useCreateRate } from "@/hooks";

export default function Exchange() {
  const {
    mutate: createRateMutation,
    isPending: isCreating,
    error: createError,
  } = useCreateRate();

  const handleCreateRate = () => {
    createRateMutation(); // 테스트용 환율 생성 요청
  };

  const {
    data: latestRate,
    isPending,
    error: fetchError,
  } = useFetchRecentRate(); // 최근 환율 조회

  return (
    <>
      {/* title: 환전 */}
      <div className="text-40 font-bold text-teal900">환전</div>

      <div className="flex flex-col gap-10 px-40 py-20">
        {/* 보유 재화 */}
        <div className="flex items-start justify-between gap-10 self-stretch px-12">
          {/* 현재 환율 */}
          <div>
            <div className="flex items-center gap-10">
              <div className="text-20 text-teal900">현재 환율: </div>
              <div className="text-34 text-teal900">1시간 = </div>
              <div className="text-34 font-bold text-teal500">
                {isPending ? (
                  "환율 정보를 불러오는 중..."
                ) : fetchError ? (
                  <div className="text-red-500">
                    Error: {fetchError.message}
                  </div>
                ) : latestRate ? (
                  `${latestRate.timeToRank}`
                ) : (
                  "데이터 없음"
                )}
              </div>
              <div className="text-34 text-teal900">티끌</div>
            </div>
            <div className="text-end text-warmGray500">
              {latestRate?.createdAt} 기준
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center gap-10 px-10">
              <div className="text-teal900">나의 보유 시간</div>
              <div className="text-34 font-bold text-teal500">0</div>
              <div className="text-34 text-teal900">시간</div>
            </div>
            <div className="flex items-center justify-center gap-10 px-10">
              <div className="text-teal900">나의 보유 티끌</div>
              <div className="text-34 font-bold text-teal500">0</div>
              <div className="text-34 text-teal900">티끌</div>
            </div>
          </div>
        </div>

        {/* 환율 생성 버튼 */}
        {/* TODO: 추후 버튼 삭제 필요 */}
        <div className="flex py-20">
          <Button
            size="l"
            variant="primary"
            design="fill"
            main="환율 생성"
            onClick={handleCreateRate}
            disabled={isCreating}
          />
          {createError && (
            <div className="text-red-500">Error: {createError.message}</div>
          )}
        </div>

        {/* 환전 인풋 */}
        <div className="flex h-[228px] gap-10 p-10">
          {/* 시간 -> 티끌 */}
          <div className="flex flex-1 flex-col gap-10 rounded-12 border border-warmGray200 px-40 py-[30px]">
            <div className="flex items-center justify-between self-stretch pb-10">
              <div className="flex items-end font-semibold text-teal900">
                시간을
                <span className="text-24 font-bold">&nbsp;티끌로 바꾸기</span>
              </div>
              <Button size="l" variant="primary" design="fill" main="환전하기">
                <span className="material-symbols-outlined">bubble_chart</span>
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-center gap-10">
              <div className="flex flex-1 flex-row items-end justify-end rounded-12 bg-warmGray200 px-20 py-14">
                <input className="max-w-[174px] flex-grow bg-warmGray200 text-right text-34 focus:outline-none" />
                <div className="ml-4 whitespace-nowrap">시간</div>
              </div>
              <div>=</div>
              <div className="flex flex-1 flex-row items-end justify-end rounded-12 bg-warmGray200 px-20 py-14">
                <input className="max-w-[174px] flex-grow bg-warmGray200 text-right text-34 focus:outline-none" />
                <div className="ml-4 whitespace-nowrap">티끌</div>
              </div>
            </div>
          </div>

          {/* 티끌 -> 시간 */}
          <div className="flex flex-1 flex-col gap-10 rounded-12 border border-warmGray200 px-40 py-[30px]">
            <div className="flex items-center justify-between self-stretch pb-10">
              <div className="flex items-end font-semibold text-teal900">
                티끌을
                <span className="text-24 font-bold">&nbsp;시간으로 바꾸기</span>
              </div>
              <Button size="l" variant="primary" design="fill" main="환전하기">
                <span className="material-symbols-outlined">access_time</span>
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-center gap-10">
              <div className="flex flex-1 flex-row items-end justify-end rounded-12 bg-warmGray200 px-20 py-14">
                <input className="max-w-[174px] flex-grow bg-warmGray200 text-right text-34 focus:outline-none" />
                <div className="ml-4 whitespace-nowrap">티끌</div>
              </div>
              <div>=</div>
              <div className="flex flex-1 flex-row items-end justify-end rounded-12 bg-warmGray200 px-20 py-14">
                <input className="max-w-[174px] flex-grow bg-warmGray200 text-right text-34 focus:outline-none" />
                <div className="ml-4 whitespace-nowrap">시간</div>
              </div>
            </div>
          </div>
        </div>

        {/* 환율 그래프 */}
        <div className="flex flex-1 flex-col items-center justify-center gap-10 rounded-10 border border-warmGray200 p-28">
          <Chart />
        </div>
      </div>
    </>
  );
}
