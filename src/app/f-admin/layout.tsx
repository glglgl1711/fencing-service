import Script from "next/script";
import './admin.css';
import AdminContainer from "components/admin/admin-comtainer";
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AdminContainer>
          <div className="dotsContentWrap">
            {children}
          </div>
        </AdminContainer>
      </body>
    </html>
  );
}
