export type ContactStatus = 'pending' | 'accepted' | 'rejected';

export interface ContactRequest {
  id: string;
  finderId: string;
  ownerId: string;
  listingId: string;
  status: ContactStatus;
  createdAt: string;
  finderPhone?: string;
  ownerPhone?: string;
}

export type AcceptType = 'Y' | 'N' | 'PENDING';

export interface SendMessage {
  sendMessageId: number;
  ownerHouseId: number;
  finderRequestId: number;
  acceptType: AcceptType;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageDetail extends SendMessage {
  // 매물 정보 (join from owner_house)
  houseTitle?: string;
  houseAddress?: string;
  housePrice?: number;
  houseDeposit?: number;
  houseMonthlyRent?: number;
  houseType?: string;
  // 임대인 정보
  ownerName?: string;
  ownerPhone?: string;
  // owner_house 테이블 상세 정보
  abangUserId?: string;
  address?: string;
  priceType?: string;
  deposit?: number;
  rent?: number;
  isActive?: boolean;
  openFrom?: string;
  openTo?: string;
  houseCreatedAt?: string;
  houseUpdatedAt?: string;
}
