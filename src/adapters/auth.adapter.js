import axios from './instance';

const signIn = (cancelToken,email, password) => {

    return axios.post('/api/login',{
        email,
        password
    },{
        cancelToken,
    })
}

const signUp = async (cancelToken, ...rest) => {
    const [username,email,password,phoneNumber,referrer] = rest
    if(referrer){
        return axios.post(`/api/register`,{
            username,
            email,
            phone:phoneNumber,
            refer_by:referrer,
            password,
            password_confirmation:password
        },{
            cancelToken,
            params:{
                referral:referrer
            },
        })
    }

    return axios.post('/api/register',{
        username,
        email,
        phone:phoneNumber,
        password,
        password_confirmation:password
    },{
        cancelToken,
    })
}

export {signIn,signUp}