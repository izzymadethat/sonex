// Convert GB to MB
export const convertStorageInGBtoMB = (storageInGB) => {
  return (storageInGB * 1024).toFixed(2);
};

export const convertStorageInMBtoGB = (storageInMB) => {
  return (storageInMB / 1024).toFixed(2);
};

export const convertFileSizeInKBtoMB = (sizeInKb) => {
  return (sizeInKb / 1024).toFixed(2);
};

export const convertFileSizeInBytestoMB = (sizeInBytes) => {
  return (sizeInBytes / 1024 / 1024).toFixed(2);
};

export const calculateStoragePercentageUsed = (
  usedStorageInMb,
  totalStorageInMb
) => {
  return (usedStorageInMb / totalStorageInMb) * 100;
};
