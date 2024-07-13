import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Test from "@/components/Test";

describe("Page", () => {
  it("renders a button", () => {
    render(<Test />);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();
  });
  it("renders a heading", () => {
    render(<Test />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
  it("renders a paragraph", () => {
    render(<Test />);

    const heading = screen.getByRole("paragraph");

    expect(heading).toBeInTheDocument();
  });
});
