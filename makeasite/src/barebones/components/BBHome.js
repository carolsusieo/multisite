import React, { Component } from 'react';

import BarebonesGallery from './BarebonesGallery';

import PHOTOS from '../photos';
/*
const buttonCustomStyle = {
  marginTop: '16px',BBReactBnbGallery
  marginBottom: '24px',
};
*/
class BBHome extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      openGallery: false,
      closeGallery: '',
      currentPhotos: null,
      currentView: 0,
      onChangeView: '',
    };
//    this.state.closeGallery = this.closeGallery.bind(this);
    this.onPhotoPress = this.onPhotoPress.bind(this);
    this.toggleGallery = this.toggleGallery.bind(this);
    this.state.onChangeView = this.onChangeView.bind(this);
    this.setBackgroundImage = this.setBackgroundImage.bind(this);
  }

  setBackgroundImage = (name,current) => {
    var currentPhoto = PHOTOS[current].photo;
    //console.log("gallery " + name + " " + current);

    this.props.setBackgroundImage(name,currentPhoto);
  };

  onChangeView = current =>{
    this.setState({currentView: current});
    this.setBackgroundImage(this.props.name,current);
  };
/*
  closeGallery = current => {
    console.log("current at close ", current);curr

    this.setState({
      openGallery: false,
      currentPhotos: null,
    });
  };
*/
  onPhotoPress(url) {
    this.setState({
      openGallery: true,
      currentPhotos: [url],
    });
  }

  toggleGallery() {
    this.setState(prevState => ({
      openGallery: !prevState.galleryOpened,
    }));
  }

  componentDidMount = async () => {
      if(this.state.openGallery == false)
        this.toggleGallery();
    }

  render() {
    const {
      openGallery,
      currentPhotos,
    } = this.state;

    const photosToShow = currentPhotos || PHOTOS;

    return (
        <BarebonesGallery
          activePhotoIndex={this.state.currentView}
          updateCurrent={this.state.onChangeView}
          show={openGallery}
          photos={photosToShow}
        />
    );
  }
}

export default BBHome;
