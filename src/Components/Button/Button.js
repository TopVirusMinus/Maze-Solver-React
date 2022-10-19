import CSS from "./Button.module.css";
const Button = ({ img, text, handleClick = () => false }) => {
  return (
    <div className={CSS.optionButton} onClick={() => handleClick()}>
      {img && (
        <img
          style={{ maxHeight: "8%", maxWidth: "8%", cursor: "pointer" }}
          src={require(`../../Images/${img}`)}
          alt={`${text} icon`}
        />
      )}
      <span style={{ cursor: "pointer" }}>{text}</span>
    </div>
  );
};

export default Button;
