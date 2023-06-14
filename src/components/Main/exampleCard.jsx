import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  {
    src: '/venn.png',
    title: 'venn diagram',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: '2023.06.20',
  },
  {
    src: '/sunb.png',
    title: 'TH',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '2023.05.12',
  },
  {
    src: '/timeline1.png',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '2023.09.10',
  },
{
    src: '/timeline2.png',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '2023.06.09',
  },
];

export const ExampleCard = () => {
  return (
    <>
    <Typography gutterBottom variant="h6" sx={{ marginLeft: 6, textDecoration: 'underline' }}>Phodo Example</Typography>
    <Grid container wrap="nowrap" justifyContent="center">
      {data.map((item, index) => (
        <Box key={index} sx={{ marginLeft: 4, width: '400', mx: 2  }}>
          <img
            style={{ objectFit: 'cover', width: 280 , height: 200}}
            alt={item.title}
            src={item.src}
          />

          <Box sx={{ pr: 2 }}>
            <Typography gutterBottom variant="body2">
              {item.title}
            </Typography>
            <Typography display="block" variant="caption" color="text.secondary">
              {item.channel}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${item.views} • ${item.createdAt}`}
            </Typography>
          </Box>
        </Box>
      ))}
    </Grid>
    </>
  );
}
