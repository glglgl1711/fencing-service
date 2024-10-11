'use client' 

export default function AdminContainer ({children} : any) {

    return (
        <>
        <div className="admin_wrap">
            {children}
        </div>
        </>
    )
}