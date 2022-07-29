import React, { useState } from 'react';
import styled from 'styled-components';
// import ReviewTile from './ReviewTile.jsx';
import DescriptionBar from './DescriptionBar.jsx';
// import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import RatingIcon from './starIcons/RatingIcon.jsx'
import axios from 'axios';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const ModalContainer = styled.div`
  width: 40%;
  height: 80%;
  // border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 30px 100px;

  position: relative;
  overflow: auto;

  h4 {
    text-align: center;
    margin: 25px 0;
    margin-bottom: 5px;
    font-size: 1.2em;
  }

  form div:nth-child(5) h4 {
    margin-bottom: 18px;
  }
  form div:nth-child(4) h4 {
    margin-bottom: 12px;
  }

  form div:nth-child(6) input {
    width: 100%;
  }

  form div:nth-child(6) textarea {
    width: 101%;
  }

  input ~ h4 {
    margin-bottom: 10px;
  }

  h4 + input {
    margin-top: 10px;
  }

  div:nth-child(6) h4:first-child {
    margin-top: 36px;
  }
  div:nth-child(6) h4:nth-child(3) {
    margin-top: 18px;
  }

  textarea + div {
    font-size: 14px;
  }
`
const Submit = styled.button`
  // position: absolute;
  padding: 8px 10px;
  // bottom: 15px;
  // right: 10px;
  background: rgba(51, 204, 255);
  color: rgba(250, 250, 250);
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`
const Close = styled.button`
  // position: absolute;
  padding: 8px 10px;
  // bottom: 15px;
  // right: 125px;
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`
const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 5px;
  margin-top: 8px;
`
const Title = styled.h3`
  text-align: center;
  border-bottom: 1px solid rgba(210, 210, 210);
  margin-bottom: 15px;
`
const Header = styled.label`
  font-size: 2.1em;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`
const Entries = styled.div`
  display: flex;
  width: 100%;
  margin: 15px 0;
`
const EntryDivLeft = styled.div`
  flex: 1;
  margin-right: 8px;
`
const EntryDiv = styled.div`
  flex: 1;
`
const EntryInput = styled.input`
  width: 97%;
  border: solid rgba(200, 200, 200);
  border-radius: 3px;
  font-size: 14px;
`
const Label = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  opacity: 0.8;
  font-size: 14px;
`
const Authentication = styled.label`
  font-size: 10px;
  font-style: italic;
  opacity: 0.9;
`
const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  // height: 10%;
  margin-top: 20px;
`
const RecommendContainer = styled.div`
  text-align: center;
  div {
    display: inline-flex;
    flex-direction: column;
    margin: 0 10px;
  }

  div input {
    margin: 10px 0px;
  }
`
const Caption = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 6px;
`
const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 2px;
  margin-bottom: 6px;
`
const ThumbnailContainer = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`

export default function AddReviewModal(props) {

  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [recommended, setRecommended] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);

  const inputHandler = (e) => {
    if (e.target.id === "review-summary") {
      setReviewSummary(e.target.value)
    }
    if (e.target.id === "review-body") {
      setReviewBody(e.target.value)
    }
  }

  const reccHandler = (e) => {
    if (e.target.value === "Yes") {
      setRecommended(true);
    }
    if (e.target.value === "No") {
      setRecommended(false);
    }
  }

  const entryHandler = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value)
    }
    if (e.target.id === "email") {
      setEmail(e.target.value)
    }
  }

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setStarRating(index);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(prevSource => [...prevSource, reader.result]);
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('error posting file');
    };
  }

  const uploadImage = (base64EncodedImage) => {
    axios.post('/api/upload', ({ data: base64EncodedImage }))
      .then((response) => { setPhotoURLs(prev => [...prev, response.data]) })
      .catch(err => console.error(err));
  }

  const alertUser = () => {
    alert(
      `You must fully enter the following: ${starRating === 0 ? 'Star rating' : ''} ${recommended === null ? 'Recommended' : ''} ${Object.keys(characteristics).length < Object.keys(props.metadata.characteristics) ? 'Item characteristics' : ''} ${reviewBody.length <= 50 ? 'Review body' : ''}`
    )
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (starRating === 0 || recommended === null || Object.keys(characteristics).length < Object.keys(props.metadata.characteristics) || reviewBody.length <= 50) {
      alertUser()
    } else {
      let obj = {
        product_id: parseInt(props.metadata.product_id),
        rating: starRating,
        summary: reviewSummary,
        body: reviewBody,
        recommend: recommended,
        name: username,
        email: email,
        photos: photoURLs,
        characteristics: characteristics
      }
      axios.post(`/reviews`, obj)
        .then((response) => {
          console.log(response)
          props.addReviewClickHandler();
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <form onSubmit={handleFormSubmit}>
          <Title>
            <Header>WRITE YOUR REVIEW</Header><br />
            <Subtitle>...about the <em>{props.productName}</em></Subtitle>
          </Title>
          <Caption>Items marked with * are required</Caption>
          <div>
            <h4>How many stars would you rate this product?*</h4>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <RatingIcon
                    key={index}
                    index={index}
                    rating={starRating}
                    hoverRating={hoverRating}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onSaveRating={onSaveRating} />
                )
              })}
            </StarContainer>
          </div>
          <div>
            <h4>Do you recommend this product?*</h4>
            <RecommendContainer>
              <div>
                <input type="radio" id="recommended" name="recommended" value="Yes" onChange={reccHandler} required></input>
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="recommended" name="recommended" value="No" onChange={reccHandler}></input>
                <label htmlFor="no">No</label>
              </div>
            </RecommendContainer>
          </div>
          <div>
            <h4>Characteristics</h4>
            {Object.keys(props.metadata.characteristics).map((label) => {
              return <DescriptionBar key={label} label={label} id={props.metadata.characteristics[label]['id']} setCharacteristics={setCharacteristics} characteristics={characteristics} required></DescriptionBar>
            })}
          </div>
          <div>
            <h4><label htmlFor="review-summary">Review Summary</label></h4>
            <input type="text" id="review-summary" name="review-summary" value={reviewSummary} onChange={inputHandler} placeholder="Best purchase ever!" size="82" maxLength="60" required />
            <h4><label htmlFor="review-body">Review Body*</label></h4>
            <textarea id="review-body" name="review-body" rows="15" cols="68" value={reviewBody} onChange={inputHandler} placeholder="Why did you like the product or not?" maxLength="1000" />
            <div>
              Minimum characters left: {50 - reviewBody.length > 0 ? 50 - reviewBody.length : 0}
            </div>
          </div>
          <Entries>
            <EntryDivLeft>
              <Label>Username</Label>
              <EntryInput type='text' placeholder='Example: jackson11!' id="username" value={username} onChange={entryHandler} maxLength='60' required />
            </EntryDivLeft>
            <EntryDiv>
              <Label>Email</Label>
              <EntryInput type='email' placeholder='Example: jack@email.com' value={email} id="email" onChange={entryHandler} maxLength='60' required />
              <Authentication>For authentication purposes, you will not be emailed.</Authentication>
            </EntryDiv>
          </Entries>
          <div>
            <h4>Upload Photos</h4>
            <input type='file' onChange={handleFileInputChange} value={fileInputState} />
            <ThumbnailContainer>
            {(previewSource.length > 0 && previewSource.length <= 4) &&
            (previewSource.map((image, key) => {
              return (<div><Thumbnail src={image} key={key} width='95' height='95' /> <button onClick={handleSubmitFile}>Upload Image</button></div>
            )}))}
            </ThumbnailContainer>
          </div>
          <ButtonContainer>
            <Close onClick={() => props.addReviewClickHandler()}>Close</Close>
            <Submit type='submit'>Submit Answer</Submit>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </ModalBackground>
  )
}