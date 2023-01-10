import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const calcTotal = () =>
    course.parts.reduce((prev, cur) => {
      return prev + cur.exercises;
    }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total number={calcTotal()} />
    </div>
  );
};

export default Course;
