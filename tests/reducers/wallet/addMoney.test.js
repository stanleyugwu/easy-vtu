import rootReducer, {addMoney, initialState,} from '../../../store/slices/walletSlice';

describe('addMoney reducer', () => {
    it('adds given money amount to wallet', () => {
        const wallet = rootReducer(initialState,addMoney(300));
        expect(wallet.balance).toBe(300);
    })

    it('adds nothing to wallet when no or invalid amount is given', () => {
        const wallet = rootReducer(initialState,addMoney());
        expect(wallet.balance).toBe(initialState.balance);
        expect(rootReducer(initialState,addMoney(-800)).balance).toBe(initialState.balance);
        expect(rootReducer(initialState,addMoney('invalid amount')).balance).toBe(initialState.balance);
    })
});
