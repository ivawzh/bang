import db, { serverTimestamp } from '../stores/firebase'
import { timeUuid, humanTimestamp, immutableMerge as merge } from '../utils'

export const gamesPath = 'games'
export const statesOfGamePath = 'statesOfGame'

export async function createGame(gameParams, user): Promise<string> {
  const clientTimestamp = humanTimestamp()
  const newGameId: string = timeUuid()
  const newGame = merge(
    {
      name: 'NEW GAME',
      id: newGameId,
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
      clientCreatedAt: clientTimestamp,
      clientUpdatedAt: clientTimestamp,
      creator: { id: user.id, name: user.name },
      isFinished: false,
      isStarted: false
    },
    gameParams
  )
  const newGameStateId = timeUuid()
  const newGameState = {
    id: newGameStateId,
    players: {
      [user.id]: user.name
    },
    createdAt: serverTimestamp,
    updatedAt: serverTimestamp,
    clientCreatedAt: clientTimestamp,
    clientUpdatedAt: clientTimestamp,
  }
  const bulkUpdate = {
    [`${gamesPath}/${newGameId}`]: newGame,
    [`${statesOfGamePath}/${newGameId}/${newGameStateId}`]: newGameState,
  }
  await db.update(bulkUpdate)
  return newGameId
}
