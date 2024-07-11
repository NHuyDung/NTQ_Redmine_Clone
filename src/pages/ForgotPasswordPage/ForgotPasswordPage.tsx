import React from "react";

const ForgotPasswordPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <h2 className="mb-2 font-semibold text-lg">Phục hồi mật khẩu</h2>
      <form
        className="bg-[#fcfcfc] border-2"
        id="login-form"
        acceptCharset="UTF-8"
        action="/account/lost_password"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center pl-40 p-2">
          <label htmlFor="email" className="font-semibold text-xs text-right p-1">
            Email
          </label>
          <span className="text-red-500 me-1">*</span>
          <input id="email" name="email" type="text" className="block w-[308px] p-1 me-1 h-6 border border-[#d7d7d7]" />
          <button className="border border-primary text-center text-xs w-10 h-5 bg-[#f2f2f2] border border-[#cccccc] hover:bg-[#ccccbb] ">Gửi</button>
        </div>
      </form>
    </>
  );
};
export default ForgotPasswordPage;
