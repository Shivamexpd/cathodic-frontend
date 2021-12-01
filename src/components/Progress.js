import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} style={{width: 150, height: 150, color: '#ffff'}}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" style={{fontSize: 40, color: '#ffff'}}>
          {`${Math.round(props.value,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
export default CircularProgressWithLabel;