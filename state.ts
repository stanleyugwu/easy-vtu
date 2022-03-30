type SignedInUserState = {
    isSignedIn: boolean;
    /** We'll use `accessToken` for auth and data fetching from server. 
     /* We wont store passwords locally.
    */
    accessToken: string;
    profile: {
        /** User's unique id */
        id: string;
        username: string;
        email: string;
        phone: string;
        image: string;
        isVerified: boolean;
        emailVerifiedAt: string | null;
        isAdmin: boolean;
        /** Unique id of referee */
        refferedBy: string;
        noOfReferrals: number;
        createdAt: string | number;
        updatedAt: string | number;
    }
};

type WalletState = {
    // user's balance in naira
    balance: number;
    // we're making account number string cus it might start with zero, and cause issues
    accountNumber: string;
    accountName: string;
    bankName: string;
}

type AppState = {
    /** Will store the date app-rating dialog was shown to user last */
    ratingModalLastSeen: number;
    /**
     *  Will store the date announcement dialog was shown to user last.
     * This is neccessary to avoid frequent pop-ups
    */
   announcementModalLastSeen: number;
}

type state = {
    user: null | SignedInUserState;
    wallet: null | WalletState;
    app: null | AppState;
}