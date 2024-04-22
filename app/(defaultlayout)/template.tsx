
export default function FadeInTemplate({ children, }: { children: React.ReactNode }) {
    return (
        <div className="content animate-fade-in">
            {children}
        </div>
    )
}