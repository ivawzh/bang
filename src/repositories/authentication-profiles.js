import db from '../stores/firebase'

export const authenticationProfilesPath = 'authenticationProfiles'

export async function findAuthenticationProfile(authenticationUid): Promise<firebase.database.DataSnapshot> {
  const profileSnapshot = await db.child(authenticationProfilesPath).child(authenticationUid).once('value')
  return profileSnapshot
}
