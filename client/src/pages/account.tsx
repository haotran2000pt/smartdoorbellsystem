import React, { useState } from "react";
import EditEmailButton from "src/features/account/edit-email-button";
import EditPasswordButton from "src/features/account/edit-password-button";
import axiosApi from "src/features/api/axiosApi";
import ContentHeader from "src/features/dashboard/content-header";
import DashboardContent from "src/features/dashboard/dashboard-content";
import DashboardHeader from "src/features/dashboard/dashboard-header";
import Button from "src/features/ui/button/button";
import Input from "src/features/ui/input/input";
import Label from "src/features/ui/label/label";
import Tabs from "src/features/ui/tabs/tabs";
import { useAuth } from "src/features/users/auth/auth.context";

const AccountPage = () => {
  const { user, updateUserField } = useAuth();
  const [name, setName] = useState(user?.username);
  const [loading, setLoading] = useState(false);

  const onUpdateName = async () => {
    try {
      setLoading(true);
      await axiosApi.post("/users/@me", { username: name });
      updateUserField({ username: name });
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader text="Tài khoản">
        <Tabs className="h-full" items={["Chung"]} />
      </DashboardHeader>
      <ContentHeader title="Thông tin tài khoản" />
      <DashboardContent>
        <div className="max-w-[600px] space-y-5">
          <div>
            <Label>Họ tên</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  disabled={loading}
                  value={name}
                  onChange={(e) =>
                    setName((e.target as HTMLInputElement).value)
                  }
                />
              </div>
              <div className="w-24 flex-shrink-0">
                <Button
                  onClick={onUpdateName}
                  loading={loading}
                  className="px-4"
                  disabled={name === user?.username}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  className="bg-gray-100"
                  readOnly={true}
                  value={user?.email}
                />
              </div>
              <div className="w-24 flex-shrink-0">
                <EditEmailButton />
              </div>
            </div>
          </div>
          <div>
            <Label>Mật khẩu</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  className="bg-gray-100 text-[17px]"
                  readOnly={true}
                  value="••••••••"
                />
              </div>
              <div className="w-24 flex-shrink-0">
                <EditPasswordButton />
              </div>
            </div>
          </div>
        </div>
      </DashboardContent>
    </>
  );
};

export default AccountPage;
