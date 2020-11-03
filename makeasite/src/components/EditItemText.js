import React from 'react';
import Dropdown from 'react-dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OnChange } from 'react-final-form-listeners';
import FontPicker from "font-picker-react";
import { SliderPicker } from 'react-color';
import FontSizeChanger from 'react-font-size-changer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import {  css } from 'aphrodite';
import { Form, Field } from 'react-final-form';

/* add of edit an item in container.  popup screen allows you to add
specifics about the item (text, links, etc)

styles={this.props.styles} data = {this.state.data}
 style = {this.state.style} mutators = {form.mutators}
 header = {this.state.header}
*/
export default function EditItemText(input){
  //console.log(input)
  var editValue = "";
  console.log(input.data)
  if(input.data && typeof input.data != 'object' && typeof input.data != 'array')
    editValue = input.data;

    return (
        <>
           <pre className="apply-font" style={input.style}>{editValue}</pre>

           <div id="textValue">
            <label>Enter Data:</label>
            <Field
              name="data"
              component="input"
              type="text"
              value={editValue}
              onChange={input.handleTextChange}
            />
           </div>
           <div id="textStyleModifiers">
              <SliderPicker color={input.style.color}
                  onChange={(color) =>
                  {
                    input.updateStyle('color',color.hex)
                    input.mutators.makeDirty()
                  }}/>
              <FontPicker
                 apiKey="AIzaSyCwxw1i_MlbMd-9xg_bcCo8UJXyZ89fYHU"
                 activeFontFamily={input.style.fontFamily}
                 onChange={(nextFont) =>
                   {
                     input.updateStyle('fontFamily',nextFont.family)
                     input.mutators.makeDirty()
                   }}/>
              <FontSizeChanger
                  onChange={(element, newValue, oldValue) =>
                    {
                       input.updateStyle("fontSize",newValue)
                       input.mutators.makeDirty()
                    }}
                    targets={['#target-two .apply-font']}
                    options={{
                                 stepSize: 2,
                                 range: 20
                    }}
                    customButtons={{
                    up: <FontAwesomeIcon icon={faPlus}/>,
                    down: <FontAwesomeIcon icon={faMinus} />,
                    style: {
                      backgroundColor: 'red',
                      color: 'white',
                      WebkitBoxSizing: 'border-box',
                      WebkitBorderRadius: '5px',
                      width: '60px'
                    },
                    buttonsMargin: 10
                  }}
              />
              <div id="target-two" test="needed for font-size-changer"
                    style={{display: 'none'}}>
                    <p className="apply-font">text</p>
              </div>
           </div>
        </>
      );

}
