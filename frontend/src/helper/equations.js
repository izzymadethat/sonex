// Convert GB to MB
export const convertStorageInGBToMB = (storageInGB) => {
  return storageInGB * 1024;
};

export const convertStorageInMBToGB = (storageInMB) => {
  return storageInMB / 1024;
};

export const convertFileSizeInKBToMB = (sizeInKb) => {
  return sizeInKb / 1024;
};

export const convertFileSizeInBytesToMB = (sizeInBytes) => {
  return sizeInBytes / 1024 / 1024;
};

export const calculateStoragePercentageUsed = (
  usedStorageInMb,
  totalStorageInMb
) => {
  return (usedStorageInMb / totalStorageInMb) * 100;
};
