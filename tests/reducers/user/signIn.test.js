import rootReducer, {initialState, signIn,} from '../../../store/slices/userSlice';

describe('signIn reducer', () => {
    it('given profile info, signs in a user and populates profile with info', () => {
        const mockProfile = {
            id:'12345',
            username : 'devvie',
            email: 'devvie@gmail.com',
            image:'uri/of/profile/image',
            isAdmin:false,
            referrals:0,
            phone: '2348066413705',
            password: '#devvie',
            createdAt:'datestring'
        }

        let user = rootReducer(initialState,signIn(mockProfile));
        expect(user.isSignedIn).toBe(true);
        expect(user.profile).toEqual(mockProfile);
    });

    it(`doesn't sign in when an invalid profile is given`, () => {
        const user = rootReducer(initialState,signIn());
        expect(user.isSignedIn).toBe(false);
        expect(user.profile).toEqual(initialState.profile);
    });

    it(`doesn't sign in when profile payload doesn't have all and only required fields/keys`, () => {
        const incompleteProfile = {
            id:'12345',
            username:'devvie',
            email:'something',
            image:'someurl',
            isAdmin:true,
            referrals:100
        }

        const user = rootReducer(initialState,signIn(incompleteProfile));
        expect(user.isSignedIn).toBe(false);
        expect(user.profile).toEqual(initialState.profile);
    })
})