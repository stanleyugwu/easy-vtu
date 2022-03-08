import { configureStore } from '@reduxjs/toolkit';
import {render, act, cleanup, fireEvent} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import PaymentMethodsDialog from "../../components/PaymentMethodsDialog";
import userReducer, {signInForTest} from '../../store/slices/userSlice';

afterAll(cleanup);

//create a minimal store for tests
const store = configureStore({
    reducer:{
        user:userReducer
    }
});

//custom render function to wrap child in Provider
function _render(Node = null) {
    return render(
        <Provider store={store}>
            {Node}
        </Provider>
    );
}

describe('<PaymentMethodsDialog/> component', () => {
    it('given `visible` as true, shows payment methods dialog', () => {
        const {queryByA11yLabel} = _render(<PaymentMethodsDialog visible={true} />);
        expect(queryByA11yLabel('payment methods modal title')).toBeTruthy(); 
    });

    it('given `visible` as false, hides payment methods dialog', () => {
        const {queryByA11yLabel} = _render(<PaymentMethodsDialog visible={false}  />);
        expect(queryByA11yLabel('payment methods modal title')).toBeFalsy(); 
    });

    it('hides `pay from wallet` option from dialog when user is not logged in, and shows it otherwise', () => {
        const {getAllByA11yLabel} = _render(<PaymentMethodsDialog visible={true} />);
        const label = 'payment-method-label';
        const initialPaymentMethods = getAllByA11yLabel(label);

        //there should be two payment methods available, since user is signed out initially
        expect(initialPaymentMethods.length).toBe(2);

        //partially sign in user (for testing purpose)
        act(() => {
            store.dispatch(signInForTest());
        });

        //there should now be three payment methods available
        const currentPaymentMethods = getAllByA11yLabel(label);
        expect(currentPaymentMethods.length).toBe(3);
    });

    it('given a `navigate` callback, passes it to child components to navigate between screens', () => {
        const navigateMock = jest.fn();
        const {getAllByA11yLabel} = _render(<PaymentMethodsDialog visible={true} navigate={navigateMock} />);
        
        const allPaymentMethods = getAllByA11yLabel('payment-method-label');
        fireEvent.press(allPaymentMethods[0]);//press first method
        
        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalled();
    });
})
