import {render,fireEvent} from '@testing-library/react-native';
import WalletCard from '../../components/WalletCard';

const walletCardTest = () => {
    describe('Wallet Card Component', () => {
        it(`renders 'Wallet' as label`, () => {
            const {getByA11yLabel} = render(<WalletCard/>);
            expect(getByA11yLabel('wallet-label').props.children).toBe('Wallet');
        })
    
        const balance = '$20000';
        it(`given ${balance} as 'balance', renders wallet card with ${balance} balance`, () => {
            const {getByA11yLabel} = render(<WalletCard balance={balance}/>);
            expect(getByA11yLabel('wallet-balance').props.children).toBe(balance);
        })
    
        it(`given no balance, renders wallet card with #0 as default balance`, () => {
            const {getByA11yLabel} = render(<WalletCard totalCards={4}/>);
            expect(getByA11yLabel('wallet-balance').props.children).toBe('#0');
        })
    
        const totalCards = 4;
        it(`given ${totalCards} as 'totalCards', renders ${totalCards} as number of cards added`, () => {
            const {getByA11yLabel} = render(<WalletCard totalCards={totalCards}/>);
            expect(getByA11yLabel('cards-added').props.children.join('')).toBe(`${totalCards} Card(s)`)
        })
    
        it(`given no totalCards prop, renders 0 as default number of cards added`, () => {
            const {getByA11yLabel} = render(<WalletCard balance={20000}/>);
            expect(getByA11yLabel('cards-added').props.children.join('')).toBe(`0 Card(s)`)
        })
    
        it('given a callback function via `onAddCallback` prop, calls the function when the add button is pressed', () => {
            const mockFn = jest.fn();
            const {getByA11yRole} = render(<WalletCard onAddCallback={mockFn}/>);
            const addBtn = getByA11yRole('button');
            fireEvent(addBtn,'onPress');
            expect(mockFn).toBeCalled();
        })
    })
}

// run test
walletCardTest();

export {walletCardTest as default}