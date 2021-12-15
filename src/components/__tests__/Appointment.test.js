import React from "react";
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/



describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});