export default function isStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const testValue = "____gmhelper_storage_test____";

    storage.setItem(testValue, testValue);
    const probablyUnnecessaryTest = storage.getItem(testValue);
    storage.removeItem(testValue);

    return testValue === probablyUnnecessaryTest;
  } catch (e) {
    const storageAvailableButFull =
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0;

    if (storageAvailableButFull) {
      console.warn(`local storage is available but full`);
      return true;
    } else {
      return false;
    }
  }
}
