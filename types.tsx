// TODO: change object to union type
let supportedColors = {
  transparent: "transparent",
  black: "#000000",
  white: "#ffffff",
  red: "#f44336",
  "red-50": "#ffebee",
  "red-100": "#ffcdd2",
  "red-200": "#ef9a9a",
  "red-300": "#e57373",
  "red-400": "#ef5350",
  "red-500": "#f44336",
  "red-600": "#e53935",
  "red-700": "#d32f2f",
  "red-800": "#c62828",
  "red-900": "#b71c1c",
  pink: "#e91e63",
  "pink-50": "#fce4ec",
  "pink-100": "#f8bbd0",
  "pink-200": "#f48fb1",
  "pink-300": "#f06292",
  "pink-400": "#ec407a",
  "pink-500": "#e91e63",
  "pink-600": "#d81b60",
  "pink-700": "#c2185b",
  "pink-800": "#ad1457",
  "pink-900": "#880e4f",
  purple: "#9c27b0",
  "purple-50": "#f3e5f5",
  "purple-100": "#e1bee7",
  "purple-200": "#ce93d8",
  "purple-300": "#ba68c8",
  "purple-400": "#ab47bc",
  "purple-500": "#9c27b0",
  "purple-600": "#8e24aa",
  "purple-700": "#7b1fa2",
  "purple-800": "#6a1b9a",
  "purple-900": "#4a148c",
  indigo: "#3f51b5",
  "indigo-50": "#e8eaf6",
  "indigo-100": "#c5cae9",
  "indigo-200": "#9fa8da",
  "indigo-300": "#7986cb",
  "indigo-400": "#5c6bc0",
  "indigo-500": "#3f51b5",
  "indigo-600": "#3949ab",
  "indigo-700": "#303f9f",
  "indigo-800": "#283593",
  "indigo-900": "#1a237e",
  blue: "#2196f3",
  "blue-50": "#e3f2fd",
  "blue-100": "#bbdefb",
  "blue-200": "#90caf9",
  "blue-300": "#64b5f6",
  "blue-400": "#42a5f5",
  "blue-500": "#2196f3",
  "blue-600": "#1e88e5",
  "blue-700": "#1976d2",
  "blue-800": "#1565c0",
  "blue-900": "#0d47a1",
  green: "#4caf50",
  "green-50": "#e8f5e9",
  "green-100": "#c8e6c9",
  "green-200": "#a5d6a7",
  "green-300": "#81c784",
  "green-400": "#66bb6a",
  "green-500": "#4caf50",
  "green-600": "#43a047",
  "green-700": "#388e3c",
  "green-800": "#2e7d32",
  "green-900": "#1b5e20",
  yellow: "#ffeb3b",
  "yellow-50": "#fffde7",
  "yellow-100": "#fff9c4",
  "yellow-200": "#fff59d",
  "yellow-300": "#fff176",
  "yellow-400": "#ffee58",
  "yellow-500": "#ffeb3b",
  "yellow-600": "#fdd835",
  "yellow-700": "#fbc02d",
  "yellow-800": "#f9a825",
  "yellow-900": "#f57f17",
};

/** The type of contact returned to caller when a contact from the user's phone has been selected */
export type Contact = {
  /** Fullname of selected contact */
  name: string;
  /** Phone number of selected contact */
  phoneNumber: string;
};

import {
  Ionicons as Icon,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
/** Type for the names of `expo-vector-icons` icons */
export namespace IconNames {
  export type Ionicon = keyof typeof Icon.glyphMap;
  export type MaterialCommunityIcon =
    keyof typeof MaterialCommunityIcons.glyphMap;
  export type Entypo = keyof typeof Entypo.glyphMap;
}

/** Type for country data */
export type Country = {
  /** full name of country */
  name: string;
  /** iso2 short name of country */
  iso2: string;
  /** country's dial code */
  dialCode: number;
};

/** Redeclare Interface to add types for theme colors */
import TwRNStylesJson from "./tw-rn-styles.json";
import { AppThemeColors } from "./tailwind.config";

import { Style } from "tailwind-react-native-classnames";
export type TailwindStyles = keyof typeof TwRNStylesJson;

export type AppColors = AppThemeColors | keyof typeof supportedColors;
// TODO: adding `string` type to `AppStyle` breaks autocompletion when adding styles
export type AppStyle =
  | TailwindStyles[]
  | boolean
  | null
  | undefined
  | {
      [k: string]: boolean | string | number;
    }
  | string
  | object;

export interface TailwindFn {
  (strings: TemplateStringsArray, ...values: (AppStyle | number)[]): Style;
  style: (...inputs: AppStyle[]) => Style;
  color: (color: AppColors) => string | undefined;
}

export type DiscountStructure = {
  /** Percentage of the discount in number */
  discountPercentage: number;
  /** Description of the discount */
  discountDescription: string;
};

export namespace RemoteConfig {
  type services = productType;
  type paymentMethods = "wallet" | "bankTransfer" | "debitCard" | "BTCTransfer";

  export type Discount = Record<services, null | DiscountStructure[]>;
  export type ActivePaymentMethods = Record<paymentMethods, boolean>;
  export type MaximumTopUpAmount = number;
  export type SupportedDataNetworkProviders = string[];
  export type SupportedAirtimeNetworkProviders = string[];
  export type ActiveServices = Record<services, boolean>;
}

// structure of airtime history
export type AirtimeHistoryData = {
  networkName: NetworkCarriers;
  phoneNumber: string;
  date: number;
};

// structure for data plans coming from server
export type DataPlan = {
  variation_code: string;
  name: string;
  variation_amount: string;
  fixedPrice: string;
};

/** Corresponsing state slices for app redux store */
export namespace AppStateSlices {
  export type UserSlice = {
    isSignedIn: boolean;
    /** We'll use `accessToken` for auth and data fetching from server. 
     /* We wont store passwords locally.
    */
    accessToken: string | null;
    profile: null | {
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
      referredBy: string;
      noOfReferrals: number;
      createdAt: string | number;
      updatedAt: string | number;
    };
  };
  export type WalletSlice = {
    // user's balance in naira
    balance: number;
    // we're making account number string cus it might start with zero, and cause issues
    accountNumber: string | null;
    accountName: string | null;
    bankName: string | null;
  };
  export type AppSlice = {
    /** Will store the date app-rating dialog was shown to user last */
    ratingModalLastSeen: number;
    /**
     * stores numbers, meter no, IUC, and other transaction preferences for easier transaction
     */
    history: {
      airtime: AirtimeHistoryData[];
      data: AirtimeHistoryData[];
      cable: string[];
      electricity: string[];
    };
  };
  export type DataPlansSlice = {
    mtn?: DataPlan[];
    glo?: DataPlan[];
    airtel?: DataPlan[];
    etisalat?: DataPlan[];
  };

  export type TransactionsSlice = {
    transactions: Transaction[] | undefined;
  };
}

/** Dispatch payload types */
export namespace DispatchPayloads {
  /** Payload for signing in */
  export type SignIn = AppStateSlices.UserSlice["profile"] & {
    accessToken: string;
  };

  /** Payload for signing out */
  export type SignOut = undefined;

  /**
   * Payload for updating profile.
   * This will be used for both when the user edits his profile and when the
   * app automatically fetches profile to keep it in sync with the server.
   *
   * This will be possible by only adding the neccessary fields to the payload object.
   * If you want to verify a user, you dispatch an action with only the `isVerified` and
   * `verifiedAt` fields in the dispatch payload. The reducer will take care of merging the payload with existing state.
   * @example dispatch(updateProfile({verified:true, verifiedAt: 1244534}))
   */
  export type UpdateProfile = Partial<
    AppStateSlices.UserSlice["profile"]
  >;

  /**
   * Payload for adding money to wallet
   * Should only be called by app carefully
   */
  export type AddMoneyPayload = number;

  /**
   * Payload for removing money from wallet
   * Should only be called by app carefully
   */
  export type RemoveMoneyPayload = number;

  /** Payload for resetting wallet */
  export type ResetWalletPayload = undefined;

  /** Payload for updating wallet account information */
  export type UpdateAccountInfoPayload = {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };

  /**
   * Payload for setting the last seen of rating modal.
   * It should be a timestamp in milliseconds
   */
  export type RatingModalLastSeenPayload = number;

  /**
   * Payload for saving airtime transaction details to history
   */
  export type AirtimeHistoryPayload = AirtimeHistoryData;

  /**
   * Payload for saving data transaction details to history
   */
  export type DataHistoryPayload = AirtimeHistoryPayload;

  /**
   * Payload for adding data plans of any provider to state
   */
  export type DataPlansPayload = {
    provider: NetworkProvidersNames;
    plans: DataPlan[];
  };

  export type AddTransactionPayload = Transaction | Transaction[];
  export type RemoveTransactionPayload = Transaction["id"];
}

/**
 * Root state of the app.
 * The essence of `null` in the union is for when user is not logged in
 */
export type RootState = {
  user: AppStateSlices.UserSlice;
  wallet: AppStateSlices.WalletSlice;
  app: AppStateSlices.AppSlice;
  dataPlans: AppStateSlices.DataPlansSlice;
  transactions: AppStateSlices.TransactionsSlice;
};

/**
 * // => NAVIGATION-RELATED TYPES
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetworkProvidersNames } from "./utils/detectCarrierFromNumber";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type productType =
  | "airtime"
  | "data"
  | "electricity"
  | "cable"
  | "scratchCard";

export enum NetworkCarriers {
  Unknown,
  Mtn,
  Airtel,
  Glo,
  Etisalat,
}

export type RootStackParamList = {
  UserScreenNavigation: NavigatorScreenParams<RootTabParamList> | undefined;
  Splash: { activeScreen: 1 | 2 | 3 };
  Landing: undefined;
  "Sign-Up": undefined;
  "Sign-In": undefined;
  "Forgot-Password": undefined;
  QuickSub: undefined;

  //Service screens
  NetworkProviders: { serviceType: "Airtime" | "Data" };
  AirtimeScreen: undefined;
  DataScreen: undefined;
  ElectricityScreen: undefined;
  CableScreen: undefined;
  ScratchCardScreen: undefined;
  TransactionReviewScreen: {
    productType: productType;
    product: string;
    transactionCost: number;
  };
  BankTransferScreen: {
    transferAmount: number;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// Screens for BottomTab (i.e after logging in)
export type RootTabParamList = {
  Home: undefined;
  Wallet: {
    quickAction?: "deposit" | "withdraw";
  };
  Transactions: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/**
 * Server-defined service id types
 */
export type NetworkServiceId =
  | "glo-data"
  | "mtn-data"
  | "airtel-data"
  | "etisalat-data";

// server-defined transaction structure
export type Transaction = {
  id: number;
  user_id: string;
  trans_no: string;
  service: string;
  amount: number;
  payment_method: string;
  created_at: string;
  updated_at: string;
};

/**
 * Types for the form fields of different forms used in the app.
 * Each type's field correspond to the field server expects/reads
 */
export namespace FormFieldsTypes {
  export type Login = {
    email: string;
    password: string;
  };

  export type SignUp = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    referrer: string;
  };

  export type TopupAirtime = {
    amount: number;
    service_id: "glo" | "mtn" | "airtel" | "etisalat";
    phone: string;
  };

  export type TopupData = {
    serviceID: NetworkServiceId;
    variation_code: string;
    phone: string;
    amount: string;
  };

  // TODO: Contact backend dev to make service_id field value match the service_id
  // of network providers response "mtn" instead of "mtn-data"
  export type GetDataPlans = {
    serviceID: NetworkServiceId;
  };

  export type UpdateProfile = {
    username: string;
    email: string;
    phone: string;
  };
}

/**
 * TYPES FOR SERVER-DEFINED RESPONSE PAYLOADS
 */
export namespace Server {
  export type Response = {
    status: boolean;
    message: string | { [field: string]: string[] };
    data: any;
  };

  export type LoginResponse = {
    access_token: string;
    data: SignUpResponse["data"] & {
      email_verified_at: null | string;
      id: number;
    };
    expires_in: number;
    message: string;
    status: true;
    token_type: "bearer";
  };

  // Response payload for user details
  export type UserDetailsResponse = {
    status: true;
    message: string;
    data: LoginResponse["data"] & {
      image: string;
      isVerified: number;
      isAdmin: boolean;
      refer_by: null | string;
      wallet_balance: string;
      account_number: null | string;
      account_name: null | string;
      bank_name: null | string;
      no_of_referrals: number | string;
    };
  };

  export type SignUpResponse = {
    status: true;
    message: string;
    data: {
      username: string;
      email: string;
      phone: string;
      unique_id: string;
      updated_at: string;
      created_at: string;
    };
  };

  export type TopupAirtime = {
    status: true;
    message: string;
    data: {
      trans_id: number;
      user_id: string;
      amount: string;
      network: string;
      phone: string;
      status: string;
      updated_at: string;
      created_at: string;
    };
  };

  export type DataPlans = {
    status: true;
    message: string;
    data: {
      service_name: string;
      variations: DataPlan[];
    };
  };

  export type TopupData = {
    status: boolean;
    message: string;
    data: any;
    // TODO: make this type complete and correspondng to server definition
  };

  export type ErrorResponse = {
    status: false;
    message: string | { [field: string]: string[] };
    data: null | "Empty";
  };

  export type RequestError = {
    message: string;
    _error: object | string;
  };

  export type GetTransactions = {
    status: true;
    message: string;
    data: Transaction[];
  };

  export type UpdateProfile = {
    status: true;
    message: "Profile Updated Successfully";
    data: LoginResponse['data'] & {image:string}
  };
}
