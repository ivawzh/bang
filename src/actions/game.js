import { createGame } from '../repositories/games'

export function createGameStart(gameName: ?string): (dispatch: func) => Promise<void> {
  return async (dispatch, getState) => {
    dispatch({ type: 'CREATE_GAME_START' })
    try {
      const states = getState().models.currentUser
      if (states.status.isLoggedIn === false) throw(new Error('User is not yet logged in'))
      const currentUser = states.user.data
      const gameParams = { name: gameName }
      const newGameId = await createGame(gameParams, currentUser)
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
  return { type: 'CREATE_GAME_FAILURE', error: { message: error.message, code: error.code, stack: error.stack, name: error.name } }
}
