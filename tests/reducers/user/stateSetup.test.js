import rootReducer from '../../../store/slices/userSlice';

describe('userSlice root reducer setup', () => {
    it('sets up the initial state correctly', () => {
        expect(rootReducer(undefined,{type:'@@INIT'})).toEqual({
            isSignedIn:false,
            accessToken:null,
            profile: {
                id:null,
                username : null,
                email: null,
                image:null,
                isAdmin:false,
                referrals:null,
                phone: null,
                password: null,
                createdAt:null
            }
        })
    })
})