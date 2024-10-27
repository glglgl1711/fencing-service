import Script from "next/script";
import './admin.css';
import AdminContainer from "components/admin/admin-comtainer";
import { cookies } from "next/headers";
import axios from "axios";
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookie = cookies()
  const cookieValue : CookieType = cookie.get('token') || {name : '', value : ''};
  // const response = await axios.get(`http://localhost:3000/api/admin/info?token=${cookieValue.value}`)
  // console.log(response?.data)
  // const isLogin = response?.data?.result;
  return (
    <html lang="en">
      <body>
        <AdminContainer
          // isLogin={isLogin}
        >
            {children}
        </AdminContainer>
        <Script
          src="https://code.jquery.com/jquery-3.7.1.js"
          strategy="beforeInteractive"
        />
        {/* Bootstrap */}
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
          strategy="beforeInteractive"
        />
        {/* Summernote */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-bs4.min.js"
          strategy="beforeInteractive"
        />
        <Script src='https://kit.fontawesome.com/b025689c8c.js' strategy="beforeInteractive"></Script>
      </body>
    </html>
  );
}
