import { redis } from '../redis/client'

interface GetSubscriberRankingPostionParams {
  subscriberId: string
}

export async function getSubscriberRankPostion({
  subscriberId,
}: GetSubscriberRankingPostionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
