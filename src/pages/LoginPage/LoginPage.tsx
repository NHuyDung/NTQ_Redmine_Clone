import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div id="login-form" className="border-2 border-[rgba(253,191,59,255)] w-[463px] p-1 bg-[#ffebc1]">
      <form className="" acceptCharset="UTF-8" action="/login" method="post">
        <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
          <label htmlFor="username" className="font-semibold text-right p-1">
            Đăng nhập:
          </label>
          <input id="username" name="username" type="text" className="block w-308 border shadow-[#50d71e] p-1 ml-4" />
        </div>
        <div className="grid grid-cols-[100px_minmax(200px,_1fr)] m-3">
          <label htmlFor="username" className="font-semibold text-right p-1">
            Mật khẩu:
          </label>
          <input id="password" name="password" type="text" className="block w-308 border  shadow-[#50d71e] p-1 ml-4" />
        </div>
        <div className="grid grid-cols-[100px_minmax(200px,_1fr)] flex justify-start m-[10px] text-left">
          <label htmlFor="username" className="font-semibold text-right p-1 "></label>
          <label>
            <input className="ml-4" type="checkbox" name="remember" /> Lưu thông tin đăng nhập
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 place-content-between">
          <a href="/forgot-password" className="p-2">
            Phục hồi mật mã
          </a>
          <button type="submit" className="p-2 text-center">
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
