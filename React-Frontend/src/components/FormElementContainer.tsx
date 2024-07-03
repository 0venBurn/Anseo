interface Props {
    id: string,
    label: string,
    name: string,
    type: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FormElementContainer: React.FC<Props> = ({ handleChange, id, label, name, type}) => {
    return (
        <div>
            <label htmlFor={id} >{label}</label>
            <input type={type} id={id} name={name} onChange={handleChange} ></input>
        </div>
    )
}