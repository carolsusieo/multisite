import React from 'react';
import {Button} from 'reactstrap';
import Draggable from 'react-draggable';
import ArticleItem from './ArticleItem';


export default class ArticleButton extends ArticleItem{
  render(){
    var styleval = this.getStyleVal(this.props.item);

      return(
        <>
        <Draggable
          onDrag={this.onDrag}
          onStop={this.onStop}
                >
                {this.props.item.className ?
                  <Button
                  style={{styleval}}
                  id={this.props.item.id}
                  className={this.props.item.className}
                  variant= {this.props.item.variant}
                  >
                  {this.props.item.data}
                </Button>
                :
            <Button
            style={{styleval}}
            id={this.props.item.id}
            className="btn btn-sm btn-outline-success"
            variant= {this.props.item.variant}
            >
            {this.props.item.data}
          </Button>

        }
        </Draggable>
        {this.renderPlus(this.props.item.data)}
        </>

      )
  }
}
