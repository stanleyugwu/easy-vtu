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
  export type Announcement = {
    title: null | string;
    message: null | string;
    /**
     * Where the app will redirect to when the button in announcement modal is pressed.
     * Absence of the field will make the button invisible all-together
     */
    buttonUrl: null | string;
  };
}

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
     *  Will store the date announcement dialog was shown to user last.
     * This is neccessary to avoid frequent pop-ups
     */
    announcementModalLastSeen: number;
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

  export type updateProfilePayloadKeys =
    | "username"
    | "email"
    | "phone"
    | "image"
    | "isVerified"
    | "emailVerifiedAt"
    | "isAdmin"
    | "referredBy"
    | "noOfReferrals"
    | "createdAt"
    | "updatedAt";

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
  export type UpdateProfile = Pick<
    AppStateSlices.UserSlice["profile"],
    updateProfilePayloadKeys
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
   * Payload for setting the last seen of annoncement modal.
   * It should be a timestamp in milliseconds
   */
  export type AnnouncementModalLastSeenPayload = number;
}

/**
 * Root state of the app.
 * The essence of `null` in the union is for when user is not logged in
 */
export type RootState = {
  user: AppStateSlices.UserSlice;
  wallet: AppStateSlices.WalletSlice;
  app: AppStateSlices.AppSlice;
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
import { ImageSourcePropType } from "react-native";

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

export type RootStackParamList = {
  UserScreenNavigation: NavigatorScreenParams<RootTabParamList> | undefined;
  Splash: { activeScreen: 1 | 2 | 3 };
  "Sign-Up": undefined;
  "Sign-In": undefined;
  "Forgot-Password": undefined;
  QuickSub: undefined;

  //Service screens
  NetworkProviders: { serviceType: "Airtime" | "Data" };
  AirtimeScreen: {
    headerTitle?: string;
    networkName: string;
    providerLogoSrc: ImageSourcePropType;
    recipientType: "My Self" | "Others";
  };
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
  Wallet: undefined;
  Transactions: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/**
 * TYPES FOR PAYLOADS COMING FROM THE SERVER
 */
export namespace Server {
  export type Response = {
    status: boolean;
    message: string | { [field: string]: string[] };
    data: any;
  };

  export type LoginResponse = {
    access_token:
      string,
    data: {
      created_at: string,
      email: string,
      email_verified_at: null | string,
      id: number,
      phone: string,
      unique_id: string,
      updated_at: string,
      username: string,
    },
    expires_in: number,
    message: string,
    status: true,
    token_type: "bearer",
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
}
