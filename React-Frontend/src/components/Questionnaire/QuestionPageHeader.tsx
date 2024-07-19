interface QuestionPageHeaderProps {
    title: string
    pageNumber: number
}

const QuestionPageHeader: React.FC<QuestionPageHeaderProps> = ({ title, pageNumber }) => {
    return (
        <h1 className="self-start text-3xl md:text-4xl lg:text-5xl font-bold font-alegreya mb-6 md:mb-8 2xl:ml-40">
            {pageNumber}. {title}
        </h1>
      )
}

export default QuestionPageHeader