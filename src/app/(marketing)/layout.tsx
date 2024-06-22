const marketinglayout = ({children}:{children:React.ReactNode}) => {
  return (
      <div className="h-full">
        <main className="pt-40 pb-20 bg-slate-100">
             {children}
        </main>
      </div>
  )
}

export default marketinglayout;