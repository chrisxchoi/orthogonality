/** @jest-environment jsdom */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App.jsx";
import RelatedItems from "./RelatedItems.jsx";
import RelatedListCarousel from "./RelatedListCarousel.jsx";
import RelatedCard from "./RelatedCard.jsx";

afterEach(cleanup)

describe('App component', () => {
  test('it renders', () => {
    render(<App />);
  });
 })

 describe('RelatedItems components render', () => {
  test('it renders', () => {
    const { asFragment } = render(<RelatedItems />);
    expect(asFragment(<RelatedItems />)).toMatchSnapshot()
  });

  test('RelatedItems to be a function', () => {
    expect(typeof RelatedItems).toEqual('function')
  })
 })

describe('RelatedListCarousel Component', () => {
  test('RelatedListCarousel to be a function', () => {
    expect(typeof RelatedListCarousel).toEqual('function')
  })
})

describe('RelatedCard Component', () => {
  test('RelatedCard to be a function', () => {
    expect(typeof RelatedCard).toEqual('function')
  })
})

describe('RelatedListCarousel Component', () => {
  test('RelatedListCarousel to be a function', () => {
    expect(typeof RelatedListCarousel).toEqual('function')
  })
})
