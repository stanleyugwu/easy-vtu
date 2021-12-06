import rootReducer, {initialState, setToken} from '../../../store/slices/userSlice';

describe('setToken reducer', () => {
    it('sets a given access token for user', () => {
        const user = rootReducer(initialState,setToken('###123abc_'));
        expect(user.accessToken).toBe('###123abc_');
    });

    it(`doesnt set a token when invalid or empty token is given`, () => {
        expect(rootReducer(initialState,setToken()).accessToken).toBe(initialState.accessToken);
        expect(rootReducer(initialState,setToken(' ')).accessToken).toBe(initialState.accessToken);
    });
})