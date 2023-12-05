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
  already_verified,
  user_exist,
  user_not_found,
  invalid_auth_provider_token,
  auth_provider_not_implemented,
}

export enum userFilterFlags {
  admins_only,
  members_only,
  verified_only,
  unverified_only,
  non_admins,
  non_members,
}
