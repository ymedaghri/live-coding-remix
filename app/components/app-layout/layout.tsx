import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }: any) {
  return (
    <>
      <Sidebar>
        <Header />
        {children}
      </Sidebar>
    </>
  );
}
