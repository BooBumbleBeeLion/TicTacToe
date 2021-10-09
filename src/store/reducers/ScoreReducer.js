const defaultState = {
    playerScore: 0,
    botScore: 0,
    firstPlayerScore: 0,
    secondPlayerScore: 0,
}

const plusPlayerScore = 'plusPlayerScore'
const plusBotScore = 'plusBotScore'
const plusFirstPlayerScore = 'plusFirstPlayerScore'
const plusSecondPlayerScore = 'plusSecondPlayerScore'

export const ScoreReducer = (state = defaultState, action) => {
    switch (action.type) {
        case plusPlayerScore:
            return {...state , playerScore: state.playerScore+1}
        case plusBotScore:
            return {...state , botScore: state.botScore+1}
        case plusFirstPlayerScore:
            return {...state , firstPlayerScore: state.firstPlayerScore+1}
        case plusSecondPlayerScore:
            return {...state , secondPlayerScore: state.secondPlayerScore+1}
        default:
            return {...state}
    }
}

export const plusPlayerScoreAction = () => ({ type:plusPlayerScore, payload:''})
export const plusBotScoreAction = () => ({ type:plusBotScore, payload:''})
export const plusFirstPlayerScoreAction = () => ({ type:plusFirstPlayerScore, payload:''})
export const plusSecondPlayerScoreAction = () => ({ type:plusSecondPlayerScore, payload:''})
