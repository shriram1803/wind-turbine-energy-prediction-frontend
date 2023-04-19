import React,{useState} from 'react'
import {Card, CardContent,CardActions,Button,TextField} from '@mui/material';
import { toast } from 'react-toastify';

const CompareLocations = () => {
  const [latitude1, setLatitude1] = useState('');
  const [longitude1, setLongitude1] = useState('');
  const [latitude2, setLatitude2] = useState('');
  const [longitude2, setLongitude2] = useState('');
  const [output, setOutput] = useState('');
  const [output2, setOutput2] = useState('');

  const Predict = async () =>
        await toast.promise(
            fetch('https://wind-api.onrender.com/predict-lat-and-lng', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apikey: '8168408ee3a0dfcbe3a645396b073bc4',
                    lat: latitude1,
                    lng: longitude1
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setOutput(Math.abs(json.result));
                }),
            fetch('https://wind-api.onrender.com/predict-lat-and-lng', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apikey: '8168408ee3a0dfcbe3a645396b073bc4',
                    lat: latitude2,
                    lng: longitude2
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setOutput2(Math.abs(json.result));
                    // setisOutput(true);
                }),
            {
                pending: 'Predicting from the server',
                success: 'Prediction completed 👌',
                error: 'Prediction rejected 🤯'
            }
        );

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (latitude1 && longitude1 && latitude2 && longitude2){
      Predict();
    }
    
  }
  return (
    <div className='flex flex-col mx-auto my-40'>
      <span className='font-poppins font-semibold text-lg text-gradient text-center'>Power Prediction</span>
      
      <div className='flex flex-row flex-wrap gap-x-24 my-14'>
        <div className='flex w-80'>
          <Card varient='outlined' className='flex flex-col w-full'>
          <span className='font-poppins font-semibold text-lg text-gradient text-center'>Location 1</span>
            <CardContent className='flex flex-col m-auto'>
              <div className='my-3'>
                <TextField label='Latitude' variant='standard' onChange={(e)=>{setLatitude1(e.target.value)}}/>
              </div>
              <div className='my-3'>
                <TextField label='Longitude' variant='standard' onChange={(e)=>{setLongitude1(e.target.value)}}/>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='flex w-80'>
          <Card varient='outlined' className='flex flex-col w-full'>
          <span className='font-poppins font-semibold text-lg text-gradient text-center'>Location 2</span>
            <CardContent className='flex flex-col m-auto'>
              <div className='my-3'>
                <TextField label='Latitude' variant='standard' onChange={(e)=>{setLatitude2(e.target.value)}}/>
              </div>
              <div className='my-3'>
                <TextField label='Longitude' variant='standard' onChange={(e)=>{setLongitude2(e.target.value)}}/>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <CardActions className='flex mt-4 m-auto'>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </CardActions>
      {output && <div className='flex flex-row my-10 justify-center items-center'>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>Wind Power for Location 1: </span>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>{output}</span>
      </div>}
      {output2 && <div className='flex flex-row my-10 justify-center items-center'>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>Wind Power for Location 2: </span>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>{output2}</span>
      </div>}
    </div>
  )
}

export default CompareLocations