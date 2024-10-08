import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const marketinglayout = ({children}:{children:React.ReactNode}) => {
  return (
      <div className="h-full">
        <Navbar/>
        <main className="pt-40 pb-20 bg-slate-100 h-full">
             {children}
        </main>
        <Footer/>
      </div>
  )
}

export default marketinglayout;