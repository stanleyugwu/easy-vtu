import { configureStore } from '@reduxjs/toolkit';
import {waitFor, render, cleanup, fireEvent, act} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import userReducer from '../../store/slices/userSlice';
import AirtimeScreen from '../../screens/services/AirtimeScreen';
import { signInForTest } from '../../store/slices/userSlice';

afterEach(() => {
    cleanup
});

//create a minimal store
const store = configureStore({
    reducer:{
        user:userReducer
    }
});

//custom render that wraps child redux Provider
const _render = (Node = null) => {
    return render(
        <Provider store={store}>
            {Node}
        </Provider>
    )
}


//make a shallow mock of navigation object
const navigationObjMock = {
    navigate(){
        return 'navigation.navigate'
    }
}

describe('Airtime Screen', () => {
    it('renders airtime top-up form fields', async () => {
       const {getByA11yLabel, toJSON} = _render(<AirtimeScreen navigation={navigationObjMock}/>)
       
       //wait for the element that wraps input fields to appear before making assertions
       await waitFor(() => getByA11yLabel('form wrapper'), {interval:2000, timeout:10000})
       .then(() => {
        expect(getByA11yLabel('network input')).toBeTruthy();
        expect(getByA11yLabel('recipient type input')).toBeTruthy();
        expect(getByA11yLabel('recipient numbers input')).toBeTruthy();
        expect(getByA11yLabel('airtime amount input')).toBeTruthy();
        expect(getByA11yLabel('payable amount input')).toBeTruthy();
        expect(getByA11yLabel('transaction pin input')).toBeTruthy();
        expect(getByA11yLabel('cta buy airtime')).toBeTruthy();
        expect(toJSON()).toMatchSnapshot();
       })
       .catch(e => new Error(e))
    }) 

    it('shows <NetworkSelectorModal/> when network selection input field is pressed', async () => {
        const {getByA11yLabel, queryAllByA11yLabel} = _render(<AirtimeScreen navigation={navigationObjMock}/>);
        expect(queryAllByA11yLabel('network provider button')).toEqual([]); 
        //we have to wait for `get` query because AirtimeScreen shows loader for first few ms
        await waitFor(() => getByA11yLabel('network input button'), {interval:2000,timeout:5000})
        .then(async (inputField) => {
            await act(async () => fireEvent.press(inputField));
            expect(queryAllByA11yLabel('network provider button').length).toBe(4);
        })
        .catch(e => new Error(e))
    });

    it('shows Recipient type modal dialog when recipient type input field is pressed', async () => {
        const {getByA11yLabel, queryByA11yLabel} = _render(<AirtimeScreen navigation={navigationObjMock}/>);
        expect(queryByA11yLabel('recipient modal title')).toBeFalsy();

        // initiate sign in. before accessing recipient type inputField.
        // without signing in, the input field for recipient type will be hidden
        await act(async () => {
            store.dispatch(signInForTest());//initiate sign in
            const inputField = await waitFor(() => getByA11yLabel('recipient type input button'), {interval:2000,timeout:7000});//wait a bit after dispatch, for inputField to appear
            await fireEvent.press(inputField);//press inputField 
            expect(queryByA11yLabel('recipient modal title')).toBeTruthy();
        });
    });
})  