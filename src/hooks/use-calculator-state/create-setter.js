const mapToType = {
  checkbox: "boolean",
  number: "number",
  string: "string",
  select: "string",
};

function isPrimitive(val) {
  if (typeof val === "object") {
    return val === null;
  }

  return typeof val !== "function";
}

// type StateSetter<K extends EnsureFormConfig<K>> = React.Dispatch<
//   React.SetStateAction<FormToStateMapper<K>>
// >;

export default function createSetter(setState, config) {
  return function update(update) {
    let needsUpdate = false;

    const updateObj = {};
    for (let stateKey in config) {
      // "checkbox" | "number" | "select"
      const inputType = config[stateKey];
      // a primitive type string like "boolean"
      const requiredType = mapToType[inputType];
      const updatedValue = update[stateKey];

      // TODO: when it isn't primitive, I could check the value of the key.
      if (!isPrimitive(updatedValue) || typeof updatedValue === requiredType) {
        needsUpdate = true;
        updateObj[stateKey] = updatedValue;
      }
    }

    if (needsUpdate) {
      setState((prevState) => {
        return {
          ...prevState,
          ...updateObj,
        };
      });
    }
  };
}
