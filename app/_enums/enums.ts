export enum errors {
  username_taken,
  wrong_credentials,
  not_admin,
  already_voted,
  already_changed_vote,
}

export enum userFilterFlags {
  admins_only,
  members_only,
  verified_only,
  unverified_only,
  non_admins,
  non_members,
}
