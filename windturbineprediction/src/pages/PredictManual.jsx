import React,{useState} from 'react'
import {Card, CardContent,CardActions,Button,TextField} from '@mui/material';
import { toast } from 'react-toastify';

const PredictManual = () => {
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [output, setOutput] = useState('');

  const Predict = async () =>
        await toast.promise(
            fetch('https://wind-api.onrender.com/predict-ws-and-wd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ws: speed,
                    wd: direction
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setOutput(json.result);
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
    if (speed && direction){
      Predict();
      // console.log("Submitted");
      // console.log(speed,direction);
      // setOutput("Yes");
    }
    
  }

  return (
    <div className='flex flex-col mx-auto my-40'>
      <div className='flex w-80'>
        <Card varient='outlined' className='flex flex-col w-full'>
          <span className='font-poppins font-semibold text-lg text-gradient text-center'>Power Prediction</span>
          <CardContent className='flex flex-col m-auto'>
            <div className='my-3'>
              <TextField label='Wind Speed' variant='standard' onChange={(e)=>{setSpeed(e.target.value)}}/>
            </div>
            <div className='my-3'>
              <TextField label='Wind Direction' variant='standard' onChange={(e)=>{setDirection(e.target.value)}}/>
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

export default PredictManual