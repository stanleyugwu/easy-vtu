import { AxiosResponse } from "axios";
import myAxios from "../adapters/instance";
import store from "../store";
import { updateProfile } from "../store/slices/userSlice";
import { setMoney, updateAccountInfo } from "../store/slices/walletSlice";
import { Server } from "../types";

/**
 * This function fetches user profile details from server and update the local profile details.\
 * It will also fail silently in case of error.
 */
const syncProfile = () => {
  // try fetch updates
  myAxios
    .get<any, AxiosResponse<Server.UserDetailsResponse>, any>("/api/my_profile")
    .then((response) => {
      // updates fetched
      const profile = response.data.data;

      // update profile details
      store.dispatch(
        updateProfile({
          createdAt: profile.created_at,
          email: profile.email,
          emailVerifiedAt: profile.email_verified_at,
          image: profile.image,
          isAdmin: Boolean(+profile.isAdmin),
          isVerified: Boolean(+profile.isVerified),
          noOfReferrals: +profile.no_of_referrals,
          phone: profile.phone,
          referredBy: profile.refer_by as string,
          updatedAt: profile.updated_at,
          username: profile.username,
        })
      );

      // update account info
      store.dispatch(
        updateAccountInfo({
          accountName: profile.account_name || "",
          accountNumber: profile.account_number || "",
          bankName: profile.bank_name || "",
        })
      );

      // update wallet balance
      store.dispatch(setMoney(parseInt(profile.wallet_balance || "0", 10)));
    })
    .catch((e: Server.RequestError) => {
      // error occured, probably server error
      // TODO: Report server error
    });
};
export default syncProfile;
