import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    return (good - bad) / getAll();
  };

  const getPositive = () => {
    return (good * 100) / getAll() + " %";
  };

  if (getAll() === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={getAll()} />
        <StatisticLine text="average" value={getAverage()} />
        <StatisticLine text="positive" value={getPositive()} />
      </tbody>
    </table>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <p>
          <Button text="good" handleClick={() => setGood(good + 1)} />
          <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
          <Button text="bad" handleClick={() => setBad(bad + 1)} />
        </p>
      </div>

      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
};

export default App;
