import { Component, JSX, ParentComponent } from "solid-js";
import { render } from "solid-js/web";
import "uno.css";
import { createJSXParser } from "../src";

type Props = {
  value: number;
  children?: JSX.Element | JSX.Element[];
};

const { createToken, childrenTokens } = createJSXParser<{
  id: "Value" | "Add" | "Subtract";
  props: Props;
}>({ name: "calculator" });

const Calculator: ParentComponent = props => {
  const tokens = childrenTokens(() => props.children);

  const calculation = () => {
    let result = 0;
    tokens().forEach(token => {
      console.info("token is ", token);
      if (token.id === "Value") {
        result = token.props.value;
      } else if (token.id === "Add") {
        result += token.props.value;
      } else if (token.id === "Subtract") {
        result -= token.props.value;
      }
      console.info("result is", result);
    });
    return result;
  };

  return (
    <div>
      {tokens()} = {calculation()}
    </div>
  );
};

const Value = createToken(
  (props: Props) => ({
    props,
    id: "Value"
  }),
  props => <>{props.value}</>
);

const Add = createToken(
  (props: Props) => ({
    props,
    id: "Add"
  }),
  props => <> + {props.value}</>
);

const Subtract = createToken(
  (props: Props) => ({
    props,
    id: "Subtract"
  }),
  props => <> - {props.value}</>
);

const App: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        height: "100vh"
      }}
    >
      <Calculator>
        <h1>This is a calculator</h1>
        <Value value={1} />
        <Add value={4} />
        <Subtract value={2} />
      </Calculator>
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
