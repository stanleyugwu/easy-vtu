import rootReducer, {removeMoney, initialState,} from '../../../store/slices/walletSlice';

describe('removeMoney reducer', () => {
    it('removes given money amount from wallet', () => {
        const wallet = rootReducer({...initialState,balance:400},removeMoney(300));
        expect(wallet.balance).toBe(100);
    })

    it('removes nothing from wallet when no or invalid amount is given', () => {
        const wallet = rootReducer(initialState,removeMoney());
        expect(wallet.balance).toBe(initialState.balance);
        expect(rootReducer(initialState,removeMoney(-800)).balance).toBe(initialState.balance);
        expect(rootReducer(initialState,removeMoney('invalid amount')).balance).toBe(initialState.balance);
    })

    it('removes nothing when amount to remove is greater than balance', () => {
        expect(
            rootReducer({initialState,balance:100},removeMoney(200)).balance
        ).toBe(100)
    })
});