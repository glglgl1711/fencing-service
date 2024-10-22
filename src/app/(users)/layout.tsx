import type { Metadata } from "next";
import { Manrope } from "next/font/google";
// animate css
import "animate.css";
// import swiper css
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
// video player css
import "plyr-react/plyr.css";
// glightbox css
import "glightbox/dist/css/glightbox.css";
// custom scrollcue css
// Bootstrap and custom scss
import "assets/scss/style.scss";
import ThemeProvider from "theme/ThemeProvider";
import PageProgress from "components/common/PageProgress";
import Footer from "components/layout/footer/footer";
import { SessionProvider } from "next-auth/react"
import Container from "components/Container";
import Script from "next/script";
import axios from "axios";
import AuthProvider from "components/context/AuthContext";
import Header from "components/layout/header/Header";
import { cookies } from "next/headers";
import '@fortawesome/fontawesome-free/css/all.min.css';
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sandbox - Modern & Multipurpose NextJS Template",
  description: "Generated by create next app"
};

interface CookieType {
  name : string, value : string
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookie = cookies()
  const cookieValue : CookieType = cookie.get('f_ssid') || {name : '', value : ''};
  // console.log(cookieValue)
  const response = await axios.get(`http://localhost:3000/api/user/users?token=${cookieValue?.value}`)
  // console.log(response.data)
  const currentAuth = response?.data;
  return (
    <html lang="en">
      <body className={manrope.className}>
          <ThemeProvider>
            <AuthProvider>

              <Container
                auth={currentAuth}
              >
                <Header 
                  auth={currentAuth}
                />
                  {children}
                <Footer />
              </Container>

            </AuthProvider>
          </ThemeProvider>
          <PageProgress />

          <Script
          src="https://code.jquery.com/jquery-3.7.1.js"
          strategy="beforeInteractive"
        />
        {/* Bootstrap */}
      </body>
    </html>
  );
}
