interface AuthenticationHeaderProps {
    title: string,
    subtitle: string,
}

const AuthenticationHeader: React.FC<AuthenticationHeaderProps> = ({ title, subtitle }) => {
    return (
        <>
            <h1 className="font-alegreya text-primary-text-dark text-5xl font-medium mb-4">{title}</h1>
            <p className="font-commissioner text-shaded-grey text-lg mb-6">{subtitle}</p>
        </>
    )
}

export default AuthenticationHeader