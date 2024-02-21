import Bread from "./bread.jsx";

///A Bread component with a pre-set title according to the given type
export default function BreadPreset({
  type = "info",
  subtitle = "",
  text = "",
}) {
  const infoTitle = "Information";
  const successTitle = "Success!";
  const warningTitle = "Warning!";
  const errorTitle = "Error!";

  const title =
    type === "success"
      ? successTitle
      : type === "warn"
      ? warningTitle
      : type === "error"
      ? errorTitle
      : infoTitle;

  return (
    <Bread
      type={type ?? "info"}
      title={title}
      subheader={subtitle}
      text={text}
    />
  );
}
