import axiosApi from "./axiosApi";

export const getDevices = async () => {
  const { data } = await axiosApi.get("/users/@me/devices");

  return data;
};

export const getDeviceInfo = async (deviceId: string) => {
  const { data } = await axiosApi.get(`/devices/${deviceId}`);

  return data;
};

export const addDevice = async (postData: any) => {
  const { data } = await axiosApi.post("/users/@me/devices", postData);

  return data;
};

export const deleteDevice = async (deviceId: string) => {
  const { data } = await axiosApi.delete(`/users/@me/devices/${deviceId}`);

  return data;
};

export const updateDeviceName = async ({
  deviceId,
  deviceName,
}: {
  deviceId: string;
  deviceName: string;
}) => {
  const { data } = await axiosApi.patch(`/users/@me/devices/${deviceId}`, {
    name: deviceName,
  });

  return data;
};

export const getNotifications = async () => {
  const { data } = await axiosApi.get("/users/@me/notifications");

  return data;
};
