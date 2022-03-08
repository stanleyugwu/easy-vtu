import rootReducer, {addCard, initialState} from '../../../store/slices/walletSlice';

describe('addCard reducer', () => {
    it('adds given credit card to wallet', () => {
        const card = {
            _id:'12345',
            name:'Zenith'
        }
        let wallet = rootReducer(initialState,addCard(card));
        expect(wallet.cards).toContainEqual(card);

        wallet = rootReducer(initialState,addCard([card]));
        expect(wallet.cards).toContainEqual(card);
    })

    it('adds nothing to wallet when no or invalid card is given', () => {
        const wallet = rootReducer(initialState,addCard());
        expect(wallet.cards).toEqual([]);
        expect(rootReducer(initialState,addCard([])).cards).toEqual(initialState.cards);
        expect(rootReducer(initialState,addCard(900)).cards).toEqual(initialState.cards);
        expect(rootReducer(initialState,addCard('invalid amount')).cards).toEqual(initialState.cards);
    })
});