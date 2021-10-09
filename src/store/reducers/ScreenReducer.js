const defaultState = {
    screenId: 0,
    bot: false
}

const setScreen = 'setScreen'
const setBot = 'setBot'

export const ScreenReducer = (state = defaultState, action) => {
    switch (action.type) {
        case setScreen:
            return {...state , screenId: action.payload}
        case setBot:
            return {...state , bot: action.bot}
        default:
            return {...state}
    }
}

export const setScreenAction = (payload) => ({type:setScreen, payload:payload})
export const setBotAction = (bot) => ({type:setBot, bot:bot})
