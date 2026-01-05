"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { getSendMessages } from '@/lib/repositories/finderRepository';
import { SendMessageDetail } from '@/types/contact';

export default function FinderContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<SendMessageDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getSendMessages();
        setContacts(data);
      } catch (err: any) {
        setError(err?.message ?? '컨텍 요청 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <main className="space-y-6">
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-slate-600">컨택 목록을 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      {/* 헤더 */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-teal-50 p-8 shadow-sm ring-1 ring-slate-100">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-emerald-700">나에게 제안한</p>
          <h2 className="text-3xl font-bold text-slate-900">임대인 컨택</h2>
          <p className="text-sm text-slate-600">
            임대인의 매물 제안을 확인하고 관리하세요
          </p>
        </div>
      </div>

      {/* 에러 */}
      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 컨택 비어있음 */}
      {!error && contacts.length === 0 && (
        <div className="flex min-h-[40vh] items-center justify-center rounded-3xl bg-slate-50 p-12">
          <div className="text-center">
            <p className="text-5xl">💼</p>
            <p className="mt-4 text-lg font-semibold text-slate-700">아직 컨택한 임대인이 없습니다</p>
            <p className="mt-2 text-sm text-slate-500">
              임대인이 매물을 제안하면 여기에서 확인할 수 있어요
            </p>
          </div>
        </div>
      )}

      {/* 컨택 목록 */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.sendMessageId}
            className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 transition hover:shadow-2xl cursor-pointer"
            onClick={() => router.push(`/finder/contacts/${contact.sendMessageId}`)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* 의뢰서 정보 */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      의뢰서 #{contact.finderRequestId}
                    </span>
                    {contact.acceptType === 'Y' && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        수락함
                      </span>
                    )}
                    {contact.acceptType === 'PENDING' && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        대기중
                      </span>
                    )}
                  </div>

                  {/* 매물 정보 */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {contact.houseTitle || '매물 정보'}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {contact.houseAddress || '주소 정보 없음'}
                    </p>
                  </div>

                  {/* 가격 정보 */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">보증금</span>
                      <span className="text-slate-600">
                        {contact.houseDeposit?.toLocaleString() || '0'}만원
                      </span>
                    </div>
                    {contact.houseMonthlyRent !== undefined && contact.houseMonthlyRent > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-700">월세</span>
                        <span className="text-slate-600">
                          {contact.houseMonthlyRent.toLocaleString()}만원
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 메시지 미리보기 */}
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-sm text-slate-700 line-clamp-2">
                      💬 {contact.message}
                    </p>
                  </div>

                  {/* 작성일 */}
                  <p className="text-xs text-slate-500">
                    {new Date(contact.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* 화살표 아이콘 */}
                <div className="flex-shrink-0 text-slate-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
