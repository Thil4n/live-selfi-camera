import React from "react";

const Input = ({
    input,
    handleChange,
    inputClassName = "",
    labelClassName,
}) => {
    const error = input.error;

    const getInputClassList = () => {
        let classes =
            "w-full bg-white px-4 " +
            "appearance-none transition duration-300 " +
            "ease-in-out focus: outline-none " +
            "focus:ring-0 border mb-2 " +
            "border-border-base rounded-md focus:border-green-500 h-12 ";

        classes += error ? "border-red-500 " : " ";
        classes += inputClassName;

        return classes;
    };

    const getLabelClassList = () => {
        let classes = "mb-2 ";
        classes += 0 ? "text-white " : " ";
        classes += labelClassName;
        return classes;
    };

    return (
        <div className="w-full flex flex-col mb-1">
            {input.label.length != 0 && (
                <label className={getLabelClassList()}>{input.label}</label>
            )}
            <input
                name={input.key}
                type={input.type}
                className={getInputClassList()}
                onBlur={input.validateInput}
                placeholder={input.placeholder}
                value={input.data}
                readOnly={input.readOnly}
                onChange={(e) => handleChange(e.target.value, input)}
            ></input>
            {error && <p className="text-red-500 block">{error}</p>}
        </div>
    );
};

export default Input;
