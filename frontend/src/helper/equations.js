// Convert GB to MB
export const convertStorageInGBtoMB = (storageInGB) => {
  return storageInGB * 1024;
};

export const convertStorageInMBtoGB = (storageInMB) => {
  return storageInMB / 1024;
};

export const convertFileSizeInKBtoMB = (sizeInKb) => {
  return sizeInKb / 1024;
};

export const convertFileSizeInBytestoMB = (sizeInBytes) => {
  return sizeInBytes / 1024 / 1024;
};

export const calculateStoragePercentageUsed = (
  usedStorageInMb,
  totalStorageInMb
) => {
  return (usedStorageInMb / totalStorageInMb) * 100;
};
