import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Camel from "../../../public/avatars/camel.png";
import Cow from "../../../public/avatars/cow.png";
import Dragon from "../../../public/avatars/dragon.png";
import Fox from "../../../public/avatars/fox.png";
import Jelly from "../../../public/avatars/jellyfish.png";
import Koala from "../../../public/avatars/koala.png";
import Octopus from "../../../public/avatars/octopus.png";
import Penguin from "../../../public/avatars/penguin.png";
import Rudolf from "../../../public/avatars/rudolf.png";
import Sheep from "../../../public/avatars/sheep.png";
import DefaultProfileImage from "../../../public/avatars/default.jpeg"


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    maxHeight: '80%',
    overflowY: 'auto',
    borderRadius: '10px',
  },
};

const AvatarSelectionModel = ({onSelect}) => {

  const [photoId, setPhotoId] = useState('');
  const [photo, setPhoto] = useState(0);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateProfilePhoto(val) {
    let abc;
    switch (val){
      case 1: 
         abc =  '../../../public/avatars/camel.png';
        break;
        case 2: 
        abc =  '../../../public/avatars/cow.png';
       break;
       case 3: 
         abc =  '../../../public/avatars/dragon.png';
        break;
        case 4: 
         abc =  '../../../public/avatars/fox.png';
        break;
        case 5: 
         abc =  '../../../public/avatars/jellyfish.png';
        break;
        case 6: 
         abc =  '../../../public/avatars/koala.png';
        break;
        case 7: 
         abc =  '../../../public/avatars/octopus.png';
        break;
        case 8: 
         abc =  '../../../public/avatars/penguin.png';
        break;
        case 9: 
         abc =  '../../../public/avatars/rudolf.png';
        break;
        case 10: 
         abc =  '../../../public/avatars/sheep.png';
        break;
      default: 
        abc =  "../../../public/avatars/default.jpeg"
    }
    setPhoto(val)
    setPhotoId(abc)
  }

  useEffect(() => {
    onSelect(photoId)
    closeModal();
  }, [photoId])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Avatar Selection Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div onClick={() =>updateProfilePhoto(1)}>
            <AvatarImage src={Camel} alt="Camel Avatar" />
          </div>
          <div onClick={() => updateProfilePhoto(2)}>
            <AvatarImage src={Cow} alt="Cow Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(3)}>
            <AvatarImage src={Dragon} alt="Dragon Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(4)}>
            <AvatarImage src={Fox} alt="Fox Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(5)}>
            <AvatarImage src={Jelly} alt="Jelly Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(6)}>
            <AvatarImage src={Koala} alt="Koala Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(7)}>
          <AvatarImage src={Octopus} alt="Octopus Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(8)}>
            <AvatarImage src={Sheep} alt="Sheep Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(9)}>
            <AvatarImage src={Rudolf} alt="Rudolf Avatar" />
          </div>
          <div onClick={() =>updateProfilePhoto(10)}>
            <AvatarImage src={Penguin} alt="Penguin Avatar" />
          </div>
        </div>
      </Modal>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <div onClick={openModal} className='flex justify-center'>
        { photo == 0 && (<AvatarImage src={DefaultProfileImage} alt="Default Avatar" />)}
        { photo == 1 && (<AvatarImage src={Cow} alt="Cow Avatar" />)}
        { photo == 2 && ( <AvatarImage src={Camel} alt="Camel Avatar" />)}
        { photo == 3 && (<AvatarImage src={Dragon} alt="Dragon Avatar" />)}
        { photo == 4 && ( <AvatarImage src={Fox} alt="Fox Avatar" />)}
        { photo == 5 && (<AvatarImage src={Jelly} alt="Jelly Avatar" />)}
        { photo == 6 && (<AvatarImage src={Koala} alt="Koala Avatar" />)}
        { photo == 7 && ( <AvatarImage src={Octopus} alt="Octopus Avatar" />)}
        { photo == 8 && ( <AvatarImage src={Sheep} alt="Sheep Avatar" />)}
        { photo == 9 && (<AvatarImage src={Rudolf} alt="Rudolf Avatar" />)}
        { photo == 10 && (<AvatarImage src={DefaultProfileImage} alt="Penguin Avatar" />)}
      </div>
    </div>
  );
};

const AvatarImage = ({ src, alt }) => {
  return (
    <div className="avatar-container cursor-pointer m-2 w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 hover:border-green-500">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default AvatarSelectionModel;
