import { AbilityBuilder, Ability } from "@casl/ability";
import { User } from "../types/userTypes";

export function defineAbilitiesFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.userType === "admin") {
    can("view", "Owners");
  } else if (user.userType === "owner") {
    cannot("view", "Owners");
    can("view", "UploadBook");
  }

  return build();
}
