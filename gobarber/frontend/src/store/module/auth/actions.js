export function signInRquest(email, password) {
  return {
    type: '@auth/SING_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SING_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    token: '@auth/SIGN_FAILURE',
  };
}
