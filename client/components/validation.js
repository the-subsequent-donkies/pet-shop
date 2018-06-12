// Used code from:
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// https://gist.github.com/mairh/233f6b4ffdbaaed8ec75bb0bef087e8f

export const required = value => (value ? undefined : 'Required');
export const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
