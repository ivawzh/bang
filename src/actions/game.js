import db, { serverTimestamp } from '../stores/firebase'
import { timeUuid, humanTimestamp } from '../utils'

export function createGameStart(authData: { uid: string, name: stirng }, gameName: ?string = 'NEW GAME' ): (dispatch: func) => Promise<void> {
  return async (dispatch) => {
    dispatch({ type: 'CREATE_GAME_START' })
    try {
      const newGame = { creator: authData.uid, name: gameName, createdAt: serverTimestamp, dispatchedAt: humanTimestamp(), isFinished: false, isStarted: false }
      const newGameId = timeUuid()
      const initialGameState = { players: { [authData.uid]: authData.name }, createdAt: serverTimestamp, dispatchedAt: humanTimestamp() }
      const initialGameStateId = timeUuid()
      const bulkUpdate = {
        [`gameProfiles/${newGameId}`]: newGame,
        [`games/${newGameId}/states/${initialGameStateId}`]: initialGameState,
        // [`players/${authData.uid}/playingGame`]: newGameId
      }
      await db.update(bulkUpdate)
      dispatch(createGameSuccess(newGameId))
    } catch (error) {
      dispatch(createGameFailure(error))
    }
  }
}

function createGameSuccess(newGameId: string): {type: string, newGameId: string } {
  return { type: 'CREATE_GAME_SUCCESS', newGameId }
}

function createGameFailure(error: object): { type:string, error: object } {
  return { type: 'CREATE_GAME_FAILURE', error }
}
