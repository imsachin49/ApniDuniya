import React from 'react'
import WidgetWrapper from "components/WidgetWrapper";
import Navbar from 'scenes/navbar';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Friend from 'components/Friend';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';
import { useTheme } from '@mui/material/styles';
import { palette } from '@mui/system';
import { useLocation } from 'react-router-dom';


const SearchWidget = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  console.log(location);

  return (
    <div className='search'>
      <Navbar />
      <WidgetWrapper>
      <Typography
        // color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {/* <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box> */}
    </WidgetWrapper>
    </div>
  )
}

export default SearchWidget