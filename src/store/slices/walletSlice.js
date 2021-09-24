import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    cards:[]
}

const walletSlice = createSlice({
    name:'wallet',
    initialState,
    reducers:{
        addMoney: (state,action) => {
            let amount = action.payload || 0;
            state.balance += amount;
        },
        removeMoney: (state, action) => {
            let amount = action.payload || 0;
            state.balance -= amount
        },
        addCard: (state, action) => {
            let newArray = state.cards.concat(action.payload);
            state.cards = newArray;
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(card => card._id !== action.payload);
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