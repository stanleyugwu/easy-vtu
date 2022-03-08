import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    balance: 0,
    cards:[]
}

const walletSlice = createSlice({
    name:'wallet',
    initialState,
    reducers:{
        addMoney: (state,action) => {
            let amount = action.payload;
            if(!amount || typeof amount !== 'number' || amount < 0) return
            state.balance += action.payload;
        },
        removeMoney: (state, action) => {
            let amount = action.payload;
            if(
                !amount || 
                typeof amount !== 'number' ||
                amount < 0 || 
                amount > state.balance 
            ) return
            state.balance -= amount
        },
        addCard: (state, action) => {
            let cards = action.payload;

            //assert card is an array or object
            if(
                !cards || 
                (!(cards instanceof Array) && !(cards instanceof Object)) ||
                (cards instanceof Array && !cards.length)
            ) return

            let newArray = state.cards.concat(cards);
            state.cards = newArray;
        },
        removeCard: (state, action) => {
            let cardId = action.payload;
            if(!cardId || typeof cardId !== 'string') return
            state.cards = state.cards.filter(card => card._id !== cardId);
        },
        updateCard: (state, action) => {
            let cardId = action.payload.cardId;
            let updates = action.payload.updates;
            let cards = state.cards.map(card => {
                if(card._id === cardId){
                    let newCard = {
                        ...card,
                        updates
                    }
                    return newCard
                }
                return card
            });
            state.cards = cards
        }
    }
});

export const {addMoney,removeMoney,addCard,removeCard,updateCard} = walletSlice.actions;

export const balanceSelector = (state) => state.wallet.balance;
export const cards = (state) => state.wallet.cards;

export default walletSlice.reducer