import React,{useState} from 'react'
import {Card, CardContent,CardActions,Button,TextField} from '@mui/material';
import { toast } from 'react-toastify';

const PredictLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [output, setOutput] = useState('');

  const Predict = async () =>
        await toast.promise(
            fetch('https://wind-api.onrender.com/predict-lat-and-lng', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apikey: '8168408ee3a0dfcbe3a645396b073bc4',
                    lat: latitude,
                    lng: longitude
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setOutput(Math.abs(json.result));
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
    if (latitude && longitude){
      Predict();
    }
    
  }

  return (
    <div className='flex flex-col mx-auto my-40'>
      <div className='flex w-80'>
        <Card varient='outlined' className='flex flex-col w-full'>
          <span className='font-poppins font-semibold text-lg text-gradient text-center'>Power Prediction</span>
          <CardContent className='flex flex-col m-auto'>
            <div className='my-3'>
              <TextField label='Latitude' variant='standard' onChange={(e)=>{setLatitude(e.target.value)}}/>
            </div>
            <div className='my-3'>
              <TextField label='Longitude' variant='standard' onChange={(e)=>{setLongitude(e.target.value)}}/>
            </div>
          </CardContent>
          <CardActions className='flex mt-4 m-auto'>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
          </CardActions>
        </Card>
      </div>
      
      {output && <div className='flex flex-row my-10 justify-center items-center'>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>Output: </span>
        <span className='font-poppins font-semibold text-lg text-gradient mx-5'>{output}</span>
      </div>}
    </div>
  )
}

export default PredictLocation