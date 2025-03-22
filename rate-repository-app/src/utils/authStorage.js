import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    const token = AsyncStorage.getItem(`${this.namespace}:token`);
    return token ? JSON.parse(token) : null;
  }

  setAccessToken(accessToken) {
    const token = AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
    return token ? token : null;
  }

  removeAccessToken() {
    AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
