import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center h-[618px]">
      <div id="login-form" className="border-2 border-primary-borderLogin w-[463px] h-48 p-1 mt-14	bg-primary-bgLogin ">
        <form className="" acceptCharset="UTF-8" action="/login" method="post">
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
            <label htmlFor="username" className="font-semibold text-sm text-right p-1">
              Đăng nhập:
            </label>
            <input id="username" name="username" type="text" className="block w-308 p-1 ml-4" />
          </div>
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
            <label htmlFor="username" className="font-semibold text-sm text-right p-1">
              Mật khẩu:
            </label>
            <input id="password" name="password" type="text" className="block w-308 p-1 ml-4" />
          </div>
          <div className="grid grid-cols-[100px_minmax(200px,_1fr)] ms-4 text-left">
            <label htmlFor="username" className="font-semibold text-sm text-right p-1 "></label>
            <label className="font-semibold text-sm">
              <input className="ml-4" type="checkbox" name="remember" /> Lưu thông tin đăng nhập
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 flex space-x-20 mt-2">
            <a href="/forgot-password" className="text-sm p-2 text-[#1192b1] hover:underline" rel="noopener noreferrer">
              Phục hồi mật mã
            </a>
            <button type="submit" className="border border-primary text-center text-sm p-2 w-32 bg-[#f2f2f2]">
              Đăng Nhập {">>"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
