import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

// 🌿서버요청용 import
import { request } from "../../../utils/axios-utils";
import { useMutation } from 'react-query'; 

//email전송용
import { useParams } from "react-router-dom";

const emailPost = async ({ projectId, userEmail }) => {
    console.log('projectId, userEmail', projectId, userEmail);
    return request({ 
        url: `/project/${projectId}`, 
        method: 'POST', 
        data: { userEmail } 
    });
};


const InputSubscription = () => {
  const [data, setData] = useState({
    email: '',
    status: 'initial',
  });

  const {projectId} = useParams();

  {/* 🌿 post */}
  const emailApply = useMutation(emailPost, {
      onError: (error) => {
          console.log('emailApply fail', error);
      }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' });
      }, 1500);
        emailApply.mutate({ projectId, userEmail: data.email });
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
            fontSize: '20px', // You can adjust this value to increase or decrease the font size
          })}
        >
          {/* Label text */}


          프로젝트에 같이 참여하고 싶은 사람에게 이메일을 보냅니다.
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="Phodo@Phodo.com"
          type="email"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              보내기
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are all set!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}

export default InputSubscription;