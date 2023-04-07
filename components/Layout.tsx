export default function Layout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <div className="
            container 
            mx-auto px-8 md:px-0 
        ">
            {children}
        </div>
    )
}