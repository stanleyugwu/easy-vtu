import { NetworkCarriers } from "../types";

export type NetworkProvidersNames =
  | "Mtn"
  | "Glo"
  | "Airtel"
  | "Etisalat"

/**
 * This function will detect and return the carrier of any given nigerian phone number
 */
const detectCarrierFromNumber = (
  phoneNumber: string
): NetworkCarriers => {
  type ProvidersPrefixes = Record<NetworkProvidersNames, Array<string>>;
  const allNetworkPrefixes: ProvidersPrefixes = {
    Mtn: [
      "0803",
      "0806",
      "0703",
      "0706",
      "0813",
      "0816",
      "0810",
      "0814",
      "0903",
      "0906",
      "0913",
      "0916",
    ],
    Airtel: [
      "0802",
      "0808",
      "0708",
      "0812",
      "0701",
      "0902",
      "0901",
      "0904",
      "0907",
      "0912",
    ],
    Glo: ["0805", "0807", "0705", "0815", "0811", "0905", "0915"],
    Etisalat: ["0809", "0818", "0817", "0909", "0908"],
  };

  for (let network in allNetworkPrefixes) {
    const networkPrefixes =
      allNetworkPrefixes[network as NetworkProvidersNames];
    if (networkPrefixes.find((prefix) => phoneNumber.startsWith(prefix))) {
      if(network == "Mtn") return NetworkCarriers.Mtn;
      else if(network == "Airtel") return NetworkCarriers.Airtel;
      else if(network == "Glo") return NetworkCarriers.Glo;
      else return NetworkCarriers.Etisalat;
    }
  }

  return NetworkCarriers.Unknown;
};

export default detectCarrierFromNumber;
