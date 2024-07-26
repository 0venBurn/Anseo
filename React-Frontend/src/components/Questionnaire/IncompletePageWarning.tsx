interface IncompletePageWarningProps {
    error: string;
}

const IncompletePageWarning: React.FC<IncompletePageWarningProps> = ({ error }) => {
    return (
        <>
            <p className="mb-4 text-xl md:text-2xl">{error}</p>
        </>
    )

}
export default IncompletePageWarning