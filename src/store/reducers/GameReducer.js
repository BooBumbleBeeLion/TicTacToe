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

    finishSingle: true,
    finishPlayers: true,
}

const changeImage = 'changeImage'
const restartGame = 'restartGame'

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
                    finishSingle: true,
                }
            } else {
                return {
                    ...state,
                    playersMove: true,
                    playersImages: [],
                    playersImagesId: [0, -1, -2, -3, -4, -5, -6, -7, -8],
                    playersPressed: [],
                    playersCountPressed: 0,
                    finishPlayers: true,
                }
            }
        default:
            return {...state}
    }

    function singleMakeMove(id){
        state.singleImages[id] = (state.singleMove) ? krest : circle
        state.singleImagesId[id] = (state.singleMove) ? 1 : 2
        state.singlePressed[id] = true

        return {...state,
            singleMove: !state.singleMove,
            finishSingle: false,
            singleCountPressed: ++state.singleCountPressed,
        }
    }
    function playersMakeMove(id){
        state.playersImages[id] = (state.playersMove) ? krest : circle
        state.playersImagesId[id] = (state.playersMove) ? 1 : 2
        state.playersPressed[id] = true

        return {...state,
            playersMove: !state.playersMove,
            finishPlayers: false,
            playersCountPressed: ++state.playersCountPressed,
        }
    }

}
// export const Action = (payload) => ({type: , payload:payload})

export const changeImageAction = (btnId, bot) => ({ type:changeImage, btnId:btnId, bot:bot })
export const restartGameAction = (bot) => ({ type:restartGame, bot: bot })
