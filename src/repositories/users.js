import db, { serverTimestamp } from '../stores/firebase'
import { authenticationProfilesPath } from '../repositories/authentication-profiles'
import { timeUuid, humanTimestamp } from '../utils'

const usersPath = 'users'

export async function observeUser(userId, onChange: (latestUserSnapshot) => void): Promise<void> {
  await db.child(usersPath).child(userId).on('value', onChange)
}

export async function createUser(authenticationUid, userPayload): Promise<string> {
  const clientTimestamp = humanTimestamp()
  const newUserId: string = timeUuid()
  const newUser: object = {
    ...userPayload,
    createdAt: serverTimestamp,
    updatedAt: serverTimestamp,
    clientCreatedAt: clientTimestamp,
    clientUpdatedAt: clientTimestamp,
    id: newUserId
  }
  const authenticationProfile = {
    userId: newUserId,
    createdAt: serverTimestamp,
    updatedAt: serverTimestamp,
    clientCreatedAt: clientTimestamp,
    clientUpdatedAt: clientTimestamp,
  }
  const bulkUpdate = {
    [`${authenticationProfilesPath}/${authenticationUid}`]: authenticationProfile,
    [`${usersPath}/${newUserId}`]: newUser
  }
  await db.update(bulkUpdate)
  return newUserId
}

export function unobserveUser(userId): void {
  db.child(usersPath).child(userId).off('value')
}
