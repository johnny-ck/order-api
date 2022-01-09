export const validatePostOrdersInput = (input: any): string[] => {
  const invalidDescArr = [];
  if (!input.origin) {
    invalidDescArr.push("no origin");
  } else {
    if (!Array.isArray(input.origin)) {
      invalidDescArr.push("origin is not array");
    } else if (input.origin.length !== 2) {
      invalidDescArr.push("origin length not 2");
    } else {
      if (typeof input.origin[0] !== "string") {
        invalidDescArr.push("origin[0] is not string");
      }
      if (isNaN(Number(input.origin[0]))) {
        invalidDescArr.push("origin[0] cannot cast to number");
      }
      if (typeof input.origin[1] !== "string") {
        invalidDescArr.push("origin[1] is not string");
      }
      if (isNaN(Number(input.origin[1]))) {
        invalidDescArr.push("origin[1] cannot cast to number");
      }
    }
  }
  if (!input.destination) {
    invalidDescArr.push("no destination");
  } else {
    if (!Array.isArray(input.destination)) {
      invalidDescArr.push("destination is not array");
    } else if (input.destination.length !== 2) {
      invalidDescArr.push("destination length not 2");
    } else {
      if (typeof input.destination[0] !== "string") {
        invalidDescArr.push("destination[0] is not string");
      }
      if (isNaN(Number(input.destination[0]))) {
        invalidDescArr.push("destination[0] cannot cast to number");
      }
      if (typeof input.destination[1] !== "string") {
        invalidDescArr.push("destination[1] is not string");
      }
      if (isNaN(Number(input.destination[1]))) {
        invalidDescArr.push("destination[1] cannot cast to number");
      }
    }
  }
  return invalidDescArr;
};
