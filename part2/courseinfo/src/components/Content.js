import Part from "./Part";

const Content = (props) => {
  const parts = props.parts.map((part) => {
    return <Part part={part} key={part.name} />;
  });
  return <>{parts}</>;
};

export default Content;
