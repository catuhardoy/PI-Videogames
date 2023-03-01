// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import {Link} from "react-router-dom"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Landing from "../src/views/Landing/landing"


Enzyme.configure({ adapter: new Adapter() });

describe("<Landing />",()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = Enzyme.shallow(<Landing />)
    })
    
    it("Renderiza un 'button' con el texto 'START'", () => {
        expect(wrapper.find("button").at(0).text()).toEqual("START");
      });

    it("Renders a Link with the 'to' property that addresses '/home' " , () =>{
        expect(wrapper.find(Link)).toHaveLength(1)
        expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home")
    })

})
