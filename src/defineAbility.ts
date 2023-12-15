import { defineAbility } from "@casl/ability";
import { User } from "./Interface/Auth.interface";

const defineAbilityFor = (user: User | null) =>
  defineAbility((can) => {
    can("read", "HomePage");
    can("read", "Contact");

    if (user?.role === "Admin") {
      can("read", "Services");
      can("read", "About");
      can("read", "Home", ["adminSection"]);
    }
  });

export default defineAbilityFor;
