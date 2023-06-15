import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  {
    src: '/node_ex.png',
    title: '타임라인 노드',
    channel: '업무 진행 타임라인에 따른 노드를 만들어 봐요!',
    views: '130M views',
    createdAt: '2023.09.10',
  },
  {
    src: '/venndia.png',
    title: '벤 다이어그램',
    channel: '같은 태그들의 사진을 벤 다이어그램을 만들어요!',
    views: '396k views',
    createdAt: '2023.06.15',
  },
  {
    src: '/sunb.png',
    title: '썬 버스트',
    channel: '데이터의 계층 구조와 비중을 한눈에 만들어 봐요!',
    views: '40M views',
    createdAt: '2023.06.13',
  },
{
    src: '/timeline2.png',
    title: '스케쥴링',
    channel: '업무의 흐름을 시각화하고 일정을 만들어 봐요!',
    views: '130M views',
    createdAt: '2023.06.09',
  },
];

export const ExampleCard = () => {
  return (
    <>
    <Typography gutterBottom variant="h6" sx={{ marginLeft: 6, textDecoration: 'underline' }}>Phodo와 함께하면 할 수 있는 것!</Typography>
    <Grid container wrap="nowrap" justifyContent="center">
      {data.map((item, index) => (
        <Box key={index} sx={{ marginLeft: 4, width: '400', mx: 2  }}>
          <img
            style={{ objectFit: 'cover', width: 280 , height: 200}}
            alt={item.title}
            src={item.src}
          />

          <Box sx={{ pr: 2}}>
            <Typography gutterBottom variant="body2">
              {item.title}
            </Typography>
            <Typography display="block" variant="caption" color="text.secondary">
              {item.channel}
            </Typography>
            {/* <Typography variant="caption" color="text.secondary">
              {`${item.views} • ${item.createdAt}`}
            </Typography> */}
          </Box>
        </Box>
      ))}
    </Grid>
    </>
  );
}
