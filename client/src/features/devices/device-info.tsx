import _ from "lodash";
import moment from "moment";
import React, { ReactNode, useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Device } from "src/@types/device.type";
import { getDeviceInfo, updateDeviceName } from "../api/api-call";
import Button from "../ui/button/button";
import CircleLoader from "../ui/loading/circle-loader";
import ModalContent from "../ui/modal/modal-content";
import ModalFooter from "../ui/modal/modal-footer";
import ModalHeader from "../ui/modal/modal-header";

interface DeviceInfoProps {
  deviceId: string;
}

const Category = ({ children }: { children?: ReactNode }) => (
  <div className="w-1/3 flex-shrink-0 font-bold">{children}:</div>
);
const Value = ({ children }: { children?: ReactNode }) => (
  <div className="flex-1">{children}</div>
);
const Row = ({ children }: { children?: ReactNode }) => (
  <div className="flex items-center">{children}</div>
);

const DeviceInfo: React.FC<DeviceInfoProps> = ({ deviceId }) => {
  const [name, setName] = useState<string | null>(null);

  const { isLoading, data: device } = useQuery<Device>(
    ["devices", deviceId],
    () => getDeviceInfo(deviceId)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(updateDeviceName, {
    onSuccess: (data) => {
      const previousDevices = queryClient.getQueryData<Device[]>("devices");

      const findDevice = previousDevices?.find(
        (findDevice) => findDevice.id === data.id
      );

      console.log({ findDevice, data });

      if (findDevice) {
        findDevice.name = data.name;
        queryClient.setQueryData("devices", previousDevices);
      }

      queryClient.setQueryData(["devices", deviceId], {
        ...device,
        name: data.name,
      });

      setName(null);
    },
  });

  const onUpdateName = () => {
    if (!_.isNull(name)) mutation.mutate({ deviceId, deviceName: name });
  };

  return (
    <>
      <ModalHeader>Thông tin thiết bị</ModalHeader>
      <ModalContent>
        {isLoading ? (
          <div className="py-10 flex-center">
            <CircleLoader />
          </div>
        ) : (
          <div className="font-medium space-y-3">
            <Row>
              <Category>ID</Category>
              <Value>{device?.id}</Value>
            </Row>
            <Row>
              <Category>Tên thiết bị</Category>
              <Value>
                <div className="flex items-center space-x-2">
                  {_.isNull(name) ? (
                    <>
                      <div>{device?.name}</div>
                      <div
                        onClick={() => setName(device?.name || "")}
                        className="cursor-pointer p-1 hover:bg-gray-200 transition-colors rounded-full"
                      >
                        <AiOutlineEdit />
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-b font-medium"
                      />
                      <div>
                        <Button
                          loading={mutation.isLoading}
                          onClick={onUpdateName}
                          className="rounded-full"
                        >
                          <AiOutlineCheck size={17} />
                        </Button>
                      </div>
                      {!mutation.isLoading && (
                        <div
                          onClick={() => setName(null)}
                          className="rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <AiOutlineClose size={17} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Value>
            </Row>
            <Row>
              <Category>Ngày sản xuất</Category>
              <Value>{moment(device?.createdDate).locale("vn").format("DD/MM/yyyy").toString()}</Value>
            </Row>
            <Row>
              <Category>Số thông báo</Category>
              <Value>{device?.notificationCounts}</Value>
            </Row>
            <div>
              <div className="font-bold mb-2">
                Người dùng đã kết nối với thiết bị:
              </div>
              <div className="p-2 rounded-md bg-gray-100">
                <div className="flex font-bold mb-2">
                  <div className="w-1/3 flex-shrink-0">Tên</div>
                  <div className="flex-1">Email</div>
                </div>
                <div className="divide-y">
                  {device?.connectedUsers.map((user) => (
                    <div
                      key={`connectedUser${user.email}device${deviceId}`}
                      className="flex items-center mb-1"
                    >
                      <div className="w-1/3 flex-shrink-0">{user.username}</div>
                      <div className="flex-1">{user.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
      <ModalFooter />
    </>
  );
};

export default DeviceInfo;
