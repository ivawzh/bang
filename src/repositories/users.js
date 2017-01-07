import db, { serverTimestamp } from '../stores/firebase'
import { authenticationProfilesPath } from '../repositories/authentication-profiles'
import { timeUuid, humanTimestamp } from '../utils'

const usersPath = 'users'

export async function observeUser(userId, onChange: (latestUserSnapshot) => void): Promise<void> {
  await db.child(usersPath).child(userId).on('value', onChange)
}

export async function createUser(authenticationUid, userPayload): Promise<string> {
  const newUserId: string = timeUuid()
  const newUser: object = {
    ...userPayload,
    createdAt: serverTimestamp,
    updatedAt: serverTimestamp,
    clientCreatedAt: humanTimestamp(),
    clientUpdatedAt: humanTimestamp(),
    id: newUserId
  }
  const bulkUpdate = {
    [`${authenticationProfilesPath}/${authenticationUid}/userId`]: newUserId,
    [`${usersPath}/${newUserId}`]: newUser
  }
  await db.update(bulkUpdate)
  return newUserId
}

export function unobserveUser(userId, onChange: func): void {
  db.child(usersPath).child(userId).off('value', onChange)
}
