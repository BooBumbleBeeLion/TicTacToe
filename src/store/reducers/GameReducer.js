import krest from "../../../assets/krest.png";
import circle from "../../../assets/circle.png";

const defaultState = {
    singleMove: true,
    playersMove: true,

    singleImages: [],
    playersImages: [],

    singleImagesId: [0,-1,-2,-3,-4,-5,-6,-7,-8],
    playersImagesId: [0,-1,-2,-3,-4,-5,-6,-7,-8],

    singlePressed: [],
    playersPressed: [],

    singleCountPressed: 0,
    playersCountPressed: 0,

    singleGoPlay: false,
    playersGoPlay: false,
}

const changeImage = 'changeImage'
const restartGame = 'restartGame'
const setGame = 'setGame'

export const GameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case changeImage:
            if(action.bot) {
                if (!state.singlePressed[action.btnId])
                    return singleMakeMove(action.btnId)
                else
                    return {...state}
            }
            else {
                if (!state.playersPressed[action.btnId])
                    return playersMakeMove(action.btnId)
                else
                    return {...state}
            }
        case restartGame:
            if(action.bot) {
                return {
                    ...state,
                    singleMove: true,
                    singleImages: [],
                    singleImagesId: [0, -1, -2, -3, -4, -5, -6, -7, -8],
                    singlePressed: [],
                    singleCountPressed: 0,
                }
            } else {
                return {
                    ...state,
                    playersMove: true,
                    playersImages: [],
                    playersImagesId: [0, -1, -2, -3, -4, -5, -6, -7, -8],
                    playersPressed: [],
                    playersCountPressed: 0,
                }
            }
        case setGame:
            if(action.bot) {
                state.singleMove = action.states.move
                state.singleImages = action.states.images
                state.singleImagesId = action.states.imagesId
                state.singlePressed = action.states.pressed
                state.singleCountPressed = action.states.countPressed

                return {
                    ...state,
                    singleMove: action.states.move,
                    singleImages: action.states.images,
                    singleImagesId: action.states.imagesId,
                    singlePressed: action.states.pressed,
                    singleCountPressed: action.states.countPressed,
                    singleGoPlay: true
                }
            }
            else{
                state.playersMove = action.states.move
                state.playersImages = action.states.images
                state.playersImagesId = action.states.imagesId
                state.playersPressed = action.states.pressed
                state.playersCountPressed = action.states.countPressed
                return{...state,
                    playersMove: action.states.move,
                    playersImages: action.states.images,
                    playersImagesId: action.states.imagesId,
                    playersPressed: action.states.pressed,
                    playersCountPressed: action.states.countPressed,
                    playersGoPlay: true
                }
            }
        default:
            return {...state}
    }

    function singleMakeMove(id){
        state.singleImages[id] = (state.singleMove) ? krest : circle
        state.singleImagesId[id] = (state.singleMove) ? 1 : 2
        state.singlePressed[id] = true
        state.singleMove = !state.singleMove
        state.singleCountPressed = state.singleCountPressed+1

        return {...state,}
    }
    function playersMakeMove(id){
        state.playersImages[id] = (state.playersMove) ? krest : circle
        state.playersImagesId[id] = (state.playersMove) ? 1 : 2
        state.playersPressed[id] = true
        state.playersMove = !state.playersMove
        state.playersCountPressed = state.playersCountPressed+1

        return {...state,}
    }

}
// export const Action = (payload) => ({type: , payload:payload})

export const changeImageAction = (btnId, bot) => ({ type:changeImage, btnId:btnId, bot:bot })
export const restartGameAction = (bot) => ({ type:restartGame, bot: bot })
export const setGameAction = (states, bot) => ({type:setGame, states:states, bot: bot})