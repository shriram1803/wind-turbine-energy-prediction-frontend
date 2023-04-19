import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BarGraph = () => {
  const [latitude, setLatitude] = useState('11');
  const [longitude, setLongitude] = useState('77');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    const sum = new Map();
    const freq = new Map();

    const time = data.time;
    const wp = data.wp;

    for(let i = 0; i < time.length; ++i) {
      const dt = time[i].slice(0, 10);
      if(sum.has(dt)) {
        const curr_sum = sum.get(dt);
        const curr_freq = freq.get(dt);
        sum.set(dt, curr_sum + Number(wp[i]));
        freq.set(dt, curr_freq + 1);
      } else {
        sum.set(dt, Number(wp[i]));
        freq.set(dt, 1);
      }
    }

    const labels = [];
    const values = [];

    sum.forEach((value, key) => {
      labels.push(key);
      values.push(Math.floor(value / freq.get(key)));
    });

    const newData = labels.map((label, index) => ({
      label,
      value: values[index],
      color: values[index] < 26 ? 'orange' : 'skyblue',
    }));

    return newData;
  };

  useEffect(() => {
    // handleSubmit();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    axios.post('https://wind-turbine-prediction.netlify.app/forecast-and-predict-6-days', {
      lat: latitude,
      lng: longitude,
      apikey: "8168408ee3a0dfcbe3a645396b073bc4"
    })
    .then(response => {
      const jsonData = response.data.data;

      const newData = formatData(jsonData);

      setData(newData);
      setIsLoading(false);
    })
    .catch(error => console.error(error));
  };

  return (
    <div className='flex mx-auto my-40'>
      <div className='flex w-80 mr-10'>
        <Card variant='outlined' className='flex flex-col w-full'>
          <span className='font-poppins font-semibold text-lg text-gradient text-center'>Power Prediction</span>
          <CardContent className='flex flex-col m-auto'>
            <div className='my-3'>
              <TextField label='Latitude' variant='standard' value={latitude} onChange={(e)=>{setLatitude(e.target.value)}}/>
            </div>
            <div className='my-3'>
              <TextField label='Longitude' variant='standard' value={longitude} onChange={(e)=>{setLongitude(e.target.value)}}/>
            </div>
          </CardContent>
          <CardActions className='flex mt-4 m-auto'>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
          </CardActions>
        </Card>
      </div>
      <div className='flex w-80'>
        {isLoading ? (
          <div className='flex w-full justify-center items-center'>
            <CircularProgress />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart width={800} height={500} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarGraph;
