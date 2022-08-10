import { extend, setInteractionMode } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

setInteractionMode("passive");

extend("email", email);
extend("min", min);
extend("required", required);
extend("confirmPassword", {
  params: ["target"],
  validate(value, relation: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    return value === relation.target;
  },
  message: "Password confirmation does not match",
});
