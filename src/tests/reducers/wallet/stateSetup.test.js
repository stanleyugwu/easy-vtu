import rootReducer from '../../../store/slices/walletSlice';

describe('walletSlice root reducer setup', () => {
    it('sets up the initial state correctly', () => {
        expect(rootReducer(undefined,{type:'@@INIT'})).toEqual({
            balance:0,
            cards:[]
        })
    })
})