import useInput from "../../hooks/useInput"

export const LoginInput = ({name, type}) => {
    // input의 상태변수
    // custom hook input
    const uidInput = useInput("");
    // <input value={uidInput.value} onChange={uidInput.onChange} />
    return (<input name={name} type={type} {...uidInput} />)
}