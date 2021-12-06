import rootReducer, {removeCard, initialState,} from '../../../store/slices/walletSlice';

describe('removeCard reducer', () => {
    it('given an ID, removes credit card with ID from wallet', () => {
        let initialStateMock = {
            ...initialState,
            cards:[
                {
                    _id:'12345',
                    name:'UBA'
                }
            ]
        }
        const wallet = rootReducer(initialStateMock,removeCard('12345'));
        expect(wallet.cards).toEqual([]);
    })

    it('removes nothing from wallet when no or invalid card ID is given', () => {
        const wallet = rootReducer(initialState,removeCard());
        expect(wallet.cards).toEqual(initialState.cards);
        expect(rootReducer(initialState,removeCard(800)).cards).toEqual(initialState.cards);
        expect(rootReducer(initialState,removeCard([])).cards).toEqual(initialState.cards);
    })
});