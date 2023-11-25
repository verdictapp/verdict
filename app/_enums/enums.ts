export enum errors {
  username_taken,
  wrong_credentials,
  not_admin,
  already_voted,
  already_changed_vote,
  did_not_vote_yet,
  topic_language_exists,
  language_exists,
  incorrect_password, // when updating password
  token_error,
}

export enum userFilterFlags {
  admins_only,
  members_only,
  verified_only,
  unverified_only,
  non_admins,
  non_members,
}
