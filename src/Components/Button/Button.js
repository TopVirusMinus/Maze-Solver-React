import CSS from "./Button.module.css";
const Button = ({ img, solidCol, text, handleClick = () => false }) => {
  return (
    <div className={CSS.optionButton} onClick={() => handleClick()}>
      {img && (
        <img
          className={CSS.identifier}
          style={{ maxHeight: "20%", maxWidth: "20%", cursor: "pointer" }}
          src={require(`../../Images/${img}`)}
          alt={`${text} icon`}
        />
      )}
      {solidCol && (
        <div
          className={CSS.identifier}
          style={{
            backgroundColor: solidCol,
            width: "20px",
            height: "20px",
            display: "inline-block",
            border: "1px solid #aaa",
            cursor: "pointer",
          }}
        ></div>
      )}
      <span style={{ cursor: "pointer" }}>{text}</span>
    </div>
  );
};

export default Button;
