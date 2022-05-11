import { Device, User } from "../entities";
import { DI } from "../server";

export class DeviceService {
  public static async create(id: string, createdDate: Date) {
    const device = DI.deviceRepository.create({ id, createdDate });

    await DI.deviceRepository.persistAndFlush(device);

    return device;
  }

  public static async getUserDevices(userId: string) {
    const userDevices = await DI.userDevicesRepository.find(
      {
        user: userId,
      },
      { orderBy: { createdAt: "DESC" } }
    );

    return userDevices.map((userDevice) => ({
      ...userDevice.device,
      name: userDevice.name,
    }));
  }

  public static async addUserDevice(
    deviceId: string,
    deviceName: string,
    user: User
  ) {
    const device = await DI.deviceRepository.findOneOrFail({
      id: deviceId,
    });

    const userDevice = DI.userDevicesRepository.create({
      device,
      user,
      name: deviceName,
    });

    await DI.userDevicesRepository.persistAndFlush(userDevice);

    return { ...userDevice.device, name: userDevice.name };
  }

  public static async getDeviceInfo(deviceId: string) {
    const userDevice = await DI.userDevicesRepository.findOneOrFail(
      {
        device: deviceId,
      },
      { populate: ["device"] }
    );

    const notificationCounts = (
      await userDevice.device.notifications.init()
    ).count();

    const connectedUsers = await DI.userRepository.find({
      userDevices: { device: deviceId },
    });

    return {
      ...userDevice.device,
      name: userDevice.name,
      notificationCounts,
      connectedUsers,
    };
  }

  public static async removeDevice(deviceId: string, user: User) {
    const userDevice = await DI.userDevicesRepository.findOneOrFail({
      device: deviceId,
      user,
    });

    await DI.userDevicesRepository.remove(userDevice).flush();
  }

  public static async updateDevice(
    deviceId: string,
    user: User,
    data: Partial<Device>
  ) {
    const userDevice = await DI.userDevicesRepository.findOneOrFail({
      device: deviceId,
      user,
    });

    DI.userDevicesRepository.assign(userDevice, data);

    await DI.deviceRepository.persistAndFlush(userDevice);

    return { ...userDevice.device, name: userDevice.name };
  }
}
