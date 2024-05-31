export const generate_functional_string_for_signature = (): [
  string,
  Uint8Array,
] => {
  const date = String(new Date());
  const signString = `Signin in to Click_Draw at ${date}`;

  return [signString, new TextEncoder().encode(signString)];
};
