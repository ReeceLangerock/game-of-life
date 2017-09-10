import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, find, render, simulate } from "enzyme";
import enzymeSerializer from "enzyme-to-json/serializer";
import { spy } from "sinon";
import { ButtonContainer } from "./../components/ButtonContainer";
import { Button } from "./../components/Button";

import configureStore from "redux-mock-store";

const initialState = {};
let mockStore = configureStore(initialState);
expect.addSnapshotSerializer(enzymeSerializer);
describe("ButtonContainer", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ButtonContainer store={mockStore} />, div);
  });

  let component;
  let props;

  beforeEach(() => {
    props = {};
    component = mount(<ButtonContainer {...props} />);
  });

  it("contains three buttons", () => {
    expect(component.find(Button).length).toBe(3);
  });

  it("matches snapshot", () => {
    const comp = shallow(<ButtonContainer {...props} />);
    expect(comp).toMatchSnapshot();
  });
});
