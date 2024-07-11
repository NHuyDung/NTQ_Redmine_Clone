import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): boolean => {
    setErrors("");
    if (!formData.username) {
      setErrors("Email không được để trống");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      setErrors("Email không hợp lệ");
      return false;
    }
    if (!formData.password) {
      setErrors("Mật khẩu không được để trống");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <div className="flex flex-col items-center h-[615px]">
      {errors && <p className="text-red-500 text-sm w-full border-primary-borderError bg-primary-bgError border-2 ps-4">{errors}</p>}
      <div id="login-form" className="border-2 border-primary-borderLogin w-[463px] h-40 p-1 mt-14 bg-primary-bgLogin">
        <form id="login-form" className="" acceptCharset="UTF-8" action="/login" method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
            <label htmlFor="username" className="font-semibold text-xs text-right p-1">
              Đăng nhập:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="block w-[308px] p-1 ml-4 h-6"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
            <label htmlFor="password" className="font-semibold text-xs text-right p-1">
              Mật khẩu:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-[308px] p-1 ml-4 h-6"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] ms-4 text-left">
            <label htmlFor="remember" className="font-semibold text-sm text-right p-1 "></label>
            <label className="font-semibold text-xs">
              <input id="remember" className="ml-4" type="checkbox" name="remember" /> Lưu thông tin đăng nhập
            </label>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="flex justify-start">
              <a href="/forgot-password" className="text-xs ps-2 text-[#1192b1] hover:underline" rel="noopener noreferrer">
                Phục hồi mật mã
              </a>
            </div>
            <div className="flex justify-end me-4">
              <button type="submit" className="border border-primary text-center text-xs w-24 h-5 bg-[#f2f2f2] hover:bg-[#ccccbb]">
                Đăng Nhập {">>"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
