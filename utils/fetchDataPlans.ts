import { AxiosResponse } from "axios";
import myAxios from "../adapters/instance";
import store from "../store";
import { FormFieldsTypes, Server } from "../types";
import { addDataPlans } from "../store/slices/dataPlansSlice";

/**
 * This function fetches the data plans of all the network providers
 * So the data will be ready before user navigates to data top-up screen.
 * It will fail gracefully.
 */
const fetchDataPlans = () => {
  const dispatch = store.dispatch;

  // GETS MTN DATA PLANS
  myAxios
    .post<any, AxiosResponse<Server.DataPlans>, FormFieldsTypes.GetDataPlans>(
      "/api/variation_codes",
      {
        serviceID: "mtn-data",
      }
    )
    .then(
      ({
        data: {
          data: { variations },
        },
      }) => {
        dispatch(
          addDataPlans({
            provider: "Mtn",
            plans: variations,
          })
        );
      }
    );

  // GETS AIRTEL DATA PLANS
  myAxios
    .post<any, AxiosResponse<Server.DataPlans>, FormFieldsTypes.GetDataPlans>(
      "/api/variation_codes",
      {
        serviceID: "airtel-data",
      }
    )
    .then(
      ({
        data: {
          data: { variations },
        },
      }) => {
        dispatch(
          addDataPlans({
            provider: "Airtel",
            plans: variations,
          })
        );
      }
    );

  // GETS ETISALAT DATA PLANS
  myAxios
    .post<any, AxiosResponse<Server.DataPlans>, FormFieldsTypes.GetDataPlans>(
      "/api/variation_codes",
      {
        serviceID: "etisalat-data",
      }
    )
    .then(
      ({
        data: {
          data: { variations },
        },
      }) => {
        dispatch(
          addDataPlans({
            provider: "Etisalat",
            plans: variations,
          })
        );
      }
    );

  // GETS ETISALAT DATA PLANS
  myAxios
    .post<any, AxiosResponse<Server.DataPlans>, FormFieldsTypes.GetDataPlans>(
      "/api/variation_codes",
      {
        serviceID: "glo-data",
      }
    )
    .then(
      ({
        data: {
          data: { variations },
        },
      }) => {
        dispatch(
          addDataPlans({
            provider: "Glo",
            plans: variations,
          })
        );
      }
    );
};

export default fetchDataPlans;
