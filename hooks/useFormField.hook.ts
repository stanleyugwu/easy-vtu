import React from "react";

/**
 * @typedef {array[]} goodies - array of goodies returned from hook
 * @property {string | number | boolean} fieldValue - updated value of the field
 * @property {string} fieldError - updated field error
 * @property {function} setValue - function to be called with a value for updating the field value
 *
 * @param {config} config
 * @returns {goodies} goodies
 */

export type useFormFieldConfig = {
  /** function that validates each entered value.
   * This function will be called whenever mangaged value is about to change.\
   * If it returns a string, its as assumed validation error, and the string will be set \
   * as error message. \
   * If it returns `true`, its an assumed success, and error message will be reset to null. \
   * Any other return not `string` or `true` will be ignored, and a default error message will be set instead.
   */
  validator: (newValue: string) => string | true | void;

  /** this will be the initial value of the field, defaulting to empty string if not set */
  initialValue: string;
};

type useFormFieldGoodies = [
  fieldValue: string,
  fieldError: string,
  setValue: (newValue: string) => void
];

function useFormField(config: useFormFieldConfig): useFormFieldGoodies {
  const { validator, initialValue = "" } = config;
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState(null);

  const changeValue = (newValue: string) => {
    const validationResult =
      typeof validator === "function" ? validator(newValue) : false;

    if (validationResult === true) {
      //validation successful
      setValue(newValue);
      setError(null);
    } else {
      if (typeof validationResult === "string") {
        //returned custom error
        setValue(newValue);
        setError(validationResult);
      } else {
        // returned falsy value
        setError("This field is required!");
        setValue(newValue);
      }
    }
  };

  return [value, error, changeValue];
}

export default useFormField;
